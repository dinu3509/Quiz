import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Button from '@mui/material/Button';

function App() {

  return (
    <>
<Routes>
<Route path='/' element={<Navigate to="/login"/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/> 
<Route path='/home' element={<Home/>}/> 
  </Routes>      
    </>
  )
}

export default App
