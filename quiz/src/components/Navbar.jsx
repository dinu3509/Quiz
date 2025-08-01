import React, { useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
const Navbar = () => {
const items = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profile' },
  { name: 'Quiz', path: '/createquiz' },
];
  const [state,setState] = useState(false);
  const navigate = useNavigate();
  const toggleState =()=>{
    setState(!state);
    console.log(state);
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const item = ['Settings']
  return (
    <div className='items-center flex gap-3  '>  
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mx-auto "
          >
            Logout
          </button>
          <div className="relative">
            <button className='lg:h-15 lg:w-15 h-10 w-10 bg-white rounded-full cursor-pointer
          ' onClick={toggleState}>

          </button>
          {state && (
          <div className="absolute top-15 lg:top-19 
           left-1/2 -translate-x-1/2 backdrop-blur-3xl shadow-md rounded-lg  py-2  bg-white px-1 flex flex-col z-20">
            {items.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="px-4 py-2 rounded-xl hover:bg-gray-400 cursor-pointer text-black text-center"
              >
               {item.name}
                
              </NavLink>
            ))}
          </div>
        )}
          </div>
          
      </div>
  )
}

export default Navbar