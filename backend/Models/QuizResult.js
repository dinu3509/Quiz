const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const QuizResultSchema = new Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    topic:{
        type:String
    },
    score:{
        type:Number
    },
    wrong:{
        type:Number
    },total:{
        type:Number
    },
    accuracy:{
        type:Number
    },
    time: {
    type: Date,
    default: Date.now
}
})
const quizModel = mongoose.model('QuizResult',QuizResultSchema);

module.exports = quizModel