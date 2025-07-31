import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
const RefreshHandler = ({setIsAuth}) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
       if(localStorage.getItem('token')){
        setIsAuth(true);
        if(location.pathname==='/' || location.pathname==='/login' || location.pathname==='/signup'){
            navigate('home',{replace:false});
        }
       } 
    },[location,navigate,setIsAuth])
  return (
    <div></div>
  )
}

export default RefreshHandler