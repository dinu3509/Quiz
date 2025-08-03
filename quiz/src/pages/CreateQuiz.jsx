import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header';
import axios from 'axios';
import { open,multiple } from '../assets/image';
import { useNavigate } from 'react-router-dom';
const CreateQuiz = () => {
  const navigate = useNavigate();
    const [selected,setSelected] = useState('Multiple Choice');
    const [topic, setTopic] = useState('');
    const [number, setNumber] = useState('');
 const [errors, setErrors] = useState({ topic: '', number: '' });

  const validate = () => {
    const newErrors = { topic: '', number: '' };

    if (topic.trim().length < 3) {
      newErrors.topic = 'Topic must be at least 3 characters long.';
    }

    if (Number(number) <= 0) {
      newErrors.number = 'Number must be greater than 0.';
    }

    setErrors(newErrors);

    return !newErrors.topic && !newErrors.number;
  };
    
    const handleSubmit=async()=>{
         const data = {
      topic: topic,
      number: Number(number),
      type: selected,
      time: new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
  })
    };
    console.log(data);
    if (validate()){
        try{
        const token = localStorage.getItem('token');
        const res =await axios.post('http://localhost:8080/quiz/createquiz',data,{
            headers:{
                Authorization:token
            }
        });
        console.log("Response:", res.data);
        if(res.data.message=== "Quiz Created Successfully"){
          const quizId = res.data.quiz._id;
          navigate(`/writequiz/${quizId}`)
        }
        
    
    }catch(err){
        console.log(err.response?.data || err.message);
    }
    
    }
    }
    
  return (
    <div className='min-h-screen flex flex-col gap-5 sm:gap-20 bac'>
                <Header></Header>

        <div className=" items-center flex justify-center">
            <div className="h-150 min-w-sm max-w-sm bg-black border border-gray-400 rounded-2xl p-5">
                <div className="text-3xl text-white  font-bold">CREATE QUIZ</div>
                <div className="text-gray-200 text-lg">Choose a topic</div>
                <div className="text-white flex flex-col gap-2 pt-5 ">
                    <label htmlFor="topic" className='font-bold'>TOPIC:</label>
                    <input type="text" name='topic' className='bg-gray-500 px-3 border-b h-10 focus:outline-none' placeholder='Enter Topic' onChange={(e) => {
  setTopic(e.target.value);
  if (e.target.value.trim().length >= 3) {
    setErrors(prev => ({ ...prev, topic: '' }));
  }
}}
/>
                     {errors.topic && <span className="text-red-400 text-sm">{errors.topic}</span>}
                    <div className="text-md">Please provide any topic you would like to be quizzed on.</div>
                </div>
                <div className="text-white flex flex-col gap-2 pt-5 ">
                    <label htmlFor="num" className='font-bold'>NUMBER OF QUESTIONS:</label>
                    <input type="number" name='num' className='bg-gray-500 px-3 border-b h-10 focus:outline-none' placeholder='Enter Number' onChange={(e) => {
  setNumber(e.target.value);
  if (Number(e.target.value) > 0) {
    setErrors(prev => ({ ...prev, number: '' }));
  }
}}/>
                    {errors.number && <span className="text-red-400 text-sm">{errors.number}</span>}
                    <div className="text-md">You can choose how many questions you would like to be quizzed on.</div>
                </div>
                <div className="flex justify-between py-4">
                    <Button title='Multiple Choice' isSelected={selected === 'Multiple Choice' } img={multiple} onClick={() => setSelected('Multiple Choice')}></Button>
                    <Button title='Open Ended' isSelected={selected === 'Open Ended'}
        onClick={() => setSelected('Open Ended')} img={open}></Button>
                </div>
                <div className="bg-white flex h-10 justify-center items-center rounded hover:bg-gray-700 hover:text-white transition-all duration-100 cursor-pointer mt-3 "onClick={handleSubmit}>
                    <button >
                        Submit
                    </button>
                </div>


            </div>
        </div>
    </div>
  )
}

export default CreateQuiz