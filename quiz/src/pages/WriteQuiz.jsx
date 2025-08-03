import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
const WriteQuiz = () => {
 const { id } = useParams();
 const [quiz, setQuiz] = useState(null);
 const [selected, setSelected] = useState({});

 const handleOptionChange = (questionIndex, selectedOption) => {
  setSelected(prev => ({
    ...prev,
    [questionIndex]: selectedOption
  }));
};
if(selected){
  console.log(selected)
}
 useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/writequiz/${id}`);
        setQuiz(res.data.quiz);
      } catch (err) {
        console.error("Failed to fetch quiz", err);
      }
    };

    fetchQuiz();
  }, [id]);
  const questions = quiz?.questions;
  if(questions){ console.log(questions)}
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
        </div>
    </div>
  )
}

export default WriteQuiz