const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter= require('./routes/AuthRouter');
const Quiz = require('./routes/QuizCreate');
const Write = require('./routes/WriteQuiz')
const History = require('./routes/History')
require('dotenv').config();

const PORT = process.env.PORT || 8080;

require('./Models/db')
app.use(bodyParser.json());
app.use(cors());


app.use('/auth',AuthRouter);
app.use('/quiz',Quiz)
app.use('/writequiz',Write)
app.use('/history',History)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})