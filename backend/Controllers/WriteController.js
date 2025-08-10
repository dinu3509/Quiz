const Quiz = require('../Models/quiz');

const getQuizById = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json({ quiz });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
        console.log(err)
    }
};

module.exports = { getQuizById };
