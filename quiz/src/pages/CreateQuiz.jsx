import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header';
const CreateQuiz = () => {
    const [selected,setSelected] = useState('Multiple Choice');
  return (
    <div className='min-h-screen flex flex-col gap-5 sm:gap-20 bac'>
                <Header></Header>

        <div className=" items-center flex justify-center">
            <div className="h-150 min-w-sm max-w-sm bg-black border border-gray-400 rounded-2xl p-5">
                <div className="text-3xl text-white  font-bold">CREATE QUIZ</div>
                <div className="text-gray-200 text-lg">Choose a topic</div>
                <div className="text-white flex flex-col gap-2 pt-5 ">
                    <label htmlFor="topic" className='font-bold'>TOPIC:</label>
                    <input type="text" name='topic' className='bg-gray-500 px-3 border-b h-10 focus:outline-none' placeholder='Enter Topic' />
                    <div className="text-md">Please provide any topic you would like to be quizzed on.</div>
                </div>
                <div className="text-white flex flex-col gap-2 pt-5 ">
                    <label htmlFor="num" className='font-bold'>NUMBER OF QUESTIONS:</label>
                    <input type="number" name='num' className='bg-gray-500 px-3 border-b h-10 focus:outline-none' placeholder='Enter Number' />
                    <div className="text-md">You can choose how many questions you would like to be quizzed on.</div>
                </div>
                <div className="flex justify-between py-4">
                    <Button title='Multiple Choice' isSelected={selected === 'Multiple Choice' } onClick={() => setSelected('Multiple Choice')}></Button>
                    <Button title='Open Ended' isSelected={selected === 'Open Ended'}
        onClick={() => setSelected('Open Ended')}></Button>
                </div>
                <div className="bg-white flex h-10 justify-center items-center rounded hover:bg-gray-700 hover:text-white transition-all duration-100 cursor-pointer mt-3">
                    <button>
                        Submit
                    </button>
                </div>


            </div>
        </div>
    </div>
  )
}

export default CreateQuiz