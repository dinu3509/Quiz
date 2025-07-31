import React, { useState } from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Button from '@mui/material/Button';
import RefreshHandler from '../RefreshHandler';
function App() {
  const [isAuth,setIsAuth] = useState(false);
  const PrivateRoute = ({element})=>{
    return isAuth? element : <Navigate to="/login"/>
  }

  return (
    <>
  <RefreshHandler setIsAuth={setIsAuth}></RefreshHandler>

<Routes>
<Route path='/' element={<Navigate to="/login"/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/> 
<Route path='/home' element={<PrivateRoute element={<Home/>}/>}/> 
  </Routes>      
    </>
  )
}

export default App
