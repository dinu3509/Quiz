const quizResult = require('../Models/QuizResult')
const postResult = async(req,res)=>{
     const{quizId,score,wrong,total,accuracy,topic} = req.body;
     try{
      userId = req.user._id;
        const quizResultModel = new quizResult({quizId,userId,score,wrong,total,accuracy,topic})
         await quizResultModel.save();
          res.status(201).json({
      message: "Result saved successfully",
      result: quizResultModel,
    });
     }catch(err){
        return res.status(500).json({message:"Internal Server Error"})
     }
}
module.exports = {postResult}