const Quiz = require('../Models/quiz')
const {strict_output} = require('../gpt.js')
const quizControl = async(req,res)=>{
    try{
        const{topic,number,type,time} = req.body;
        const uid = req.user._id;
        
        let questions;
        if(type === "Open Ended"){
    questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of questions and answers, the length of answer should not exceed 15 words",
        new Array(number).fill(`You are to generate a random hard open-ended question about ${topic}`),
        {
            question: "question",
            answer: "answer with max length of 15 words"
        }
    );
}else if(type==="Multiple Choice"){
        questions = await strict_output(
  `You are a helpful AI that generates multiple choice questions.
Each question should have:
- one correct answer (not more than 15 words),
- three wrong but plausible options (each under 15 words),
- the correct answer must be **one of the options**.
Make sure only one option is correct, and mention it exactly in 'answer'.`,
  new Array(number).fill(`Generate a hard multiple-choice question about ${topic}`),
  {
    question: "question",
    answer: "correct answer (must match exactly one option)",
    option1: "first option (max 15 words)",
    option2: "second option (max 15 words)",
    option3: "third option (max 15 words)",
    option4: "fourth option (max 15 words)"
  }
);

}const newQuiz = new Quiz({
            topic,number,type,time,user:uid,questions:questions
        });
 await newQuiz.save();
        res.status(201).json({
            message: 'Quiz Created Successfully',
            quiz: newQuiz,
            questions: questions
        });
        
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Server Error',success:false})
    }
}
module.exports = quizControl;