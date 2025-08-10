import React from 'react'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const WriteQuiz = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [wrong,setWrong] = useState(0);
  const [accuracy,setAccuracy] = useState(0);
 const [answers, setAnswers] = useState([]);
 const [ size,setSize] = useState(0);
 const [ count,setCount] = useState(0);
 const { id } = useParams();
 const [quiz, setQuiz] = useState(null);
 const [selected, setSelected] = useState({});
 const location = useLocation();
 const {topic} = location.state || {};

 const handleOptionChange = (questionIndex, selectedOption) => {
  setSelected(prev => ({
    ...prev,
    [questionIndex]: selectedOption
  }));
};
 useEffect(() => {
    const isSubmitted = localStorage.getItem(`submitted-${id}`);
    if (isSubmitted) {
      navigate(`/quiz-submitted`);
    }
  }, [id, navigate]);
 useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/writequiz/${id}`);
        setQuiz(res.data.quiz);
        setSize(Object.keys( res.data.quiz.questions).length);
        const initialSelected = {};
        const corAnswers = res.data.quiz.questions.map(q=>q.answer);
        setAnswers(corAnswers);
         res.data.quiz.questions.forEach((_, index) => {
        initialSelected[index] = null;
        setSelected(initialSelected); 
      });
      } catch (err) {
        console.error("Failed to fetch quiz", err);
      }
    };

    fetchQuiz();
  }, [id]);
  
  const questions = quiz?.questions;
  
useEffect(() => {
    if (submitted) {
      localStorage.setItem(`submitted-${id}`, 'true');
      navigate('/quiz-submitted',{
    state: {
      quizId: id,
      wrong:wrong,
      topic:topic,
      score: count,
      total: size,
      accuracy:accuracy,
    }});
    }
  }, [submitted, navigate, id]);
  const handleSubmit=async()=>{
    setSubmitted(true)
    let correctCount=0
    let attempted = 0;

      for(let i=0;i<size;i++){
        if (selected[i] !== null) { 
      attempted++;
      if (answers[i] === selected[i]) {
        correctCount++;
      }
    }
      }
       const calculatedAccuracy = attempted > 0 ? (correctCount / attempted) * 100 : 0;
       setAccuracy(calculatedAccuracy)  
      setCount(correctCount);
      setWrong(attempted-correctCount);
      try{
        console.log({ id, count, wrong, size, accuracy });
        const token = localStorage.getItem('token');
      const res=await axios.post("http://localhost:8080/writequiz/result",{
   quizId:id,
  score:correctCount,
  wrong:attempted - correctCount,
  total:size,
  accuracy:calculatedAccuracy,
},{
            headers:{
                Authorization:token
            }
        })
      console.log(res)
      
    }
      catch(err){
        console.log(err)
      }
       
  }


  return (
    <div className='min-h-screen bg-black p-10'>
        <div className="w-full  bg-white flex flex-col gap-8 p-2 rounded">
            {
                questions?.map((q,index)=>(
                    <div className="flex flex-col gap-1" key={index}>
                        <h3 className=''>Q{index+1}:{q.question}</h3>
                        <div className="flex flex-col px-5 gap-y-2">{['option1', 'option2', 'option3', 'option4'].map((optKey, optIndex) => (
  <label key={optKey} className='border px-5 h-10 flex items-center rounded'>
    <input
      type="radio"
      name={`question-${index}`}
      value={q[optKey]}
      className="mr-2 "
      onChange={() => handleOptionChange(index, q[optKey])}
    />
    {String.fromCharCode(97 + optIndex)}) {q[optKey]}
  </label>
))}</div>
                       

                    </div>
                ))
            }
            <div className="flex justify-end px-7">
              <button onClick={handleSubmit} className='border rounded-lg w-fit p-1'>Submit Quiz</button>
            </div>
            
        </div>
    </div>
  )
}

export default WriteQuiz