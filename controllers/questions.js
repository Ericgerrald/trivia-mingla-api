const Questions = require("../model/questions");

const getAllQuestions = async (req, res) => {
  try {
    const question = await Questions.find(req.query);
    res.status(200).json({ question, nobHits: question.length });
  } catch (error) {
    console.log(error);
  }
};

// const getSpecificQuestion = async (req, res)=>{
//   try {
//     // const
//     // const question = await Questions.findById()
//     res.send(console.log(req.params.id))
//     console.log(req.params.id);
//   } catch (error) {

//   }

module.exports = { getAllQuestions };
