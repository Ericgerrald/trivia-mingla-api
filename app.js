// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const http = require("http");

require("dotenv").config();
require("express-async-errors");
const path = require("path");
const express = require("express");

const socketio = require("socket.io");
const { formatMessage } = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*", // or specify allowed origins here
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./route/auth");
const createMessage = require("./route/chat");
const score = require("./route/score");
const question = require("./route/questions");

// error handler
const notFound = require("./middleware/not-found");
const errorHandlerMiddlewear = require("./middleware/error-handler");
// const questions = require("./model/questions");

const corsOptions = {
  origin: "*",
};

// post route
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//  static
// app.use(express.static(path.resolve(__dirname, "../client")));

// routs

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client", "index,html"));
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", createMessage);
app.use("/api/v1/chat", score);
app.use("/api/v1/trivia", question);
app.use("/socket.io", (req, res, next) => {
  res.setHeader("Content-Type", "text/javascript");
  next();
});

// middlewear
app.use(notFound);
app.use(errorHandlerMiddlewear);

const admin = "Admin";

// Run when a client connect
io.on("connection", (socket) => {
  try {
    socket.on("joinRoom", ({ userName, room }) => {
      const user = userJoin(socket.id, userName, room);

      socket.join(user.room);

      //Welcome
      socket.emit(
        "message",
        formatMessage(admin, `${userName}! Welcome to ChatMingle!!`)
      );

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage(admin, `We're thrilled to have ${userName} on board.`)
        );

      // send users in room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    // listen for chat message
    socket.on("chatMessage", (message) => {
      const user = getCurrentUser(socket.id);
      // console.log(message);
      io.to(user.room).emit("message", formatMessage(user.userName, message));
    });

    // when client disconnects
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage(
            admin,
            `Poof! ${user.userName} vanished into the digital ether. 😄`
          )
        );
        // send users in room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`Server is listening on port: ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
