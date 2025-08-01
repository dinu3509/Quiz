import React from 'react'
import Navbar from './Navbar'
const Header = () => {
  return (
    <div className='relative z-30'>
        <div className="flex  w-full justify-between  items-center  px-8 pt-5">
            <div className="flex justify-between w-full max-w-screen-2xl mx-auto items-center   rounded-full  px-4 backdrop-blur-3xl h-20">
                <div className="logo font-bold text-3xl text-white">AIQ</div>
                <Navbar></Navbar>
            </div>
        </div>
        
    </div>
  )
}

export default Header