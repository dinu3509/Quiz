import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const History = () => {
const [res,setRes]=useState([])
  useEffect(()=>{
    const fetchHistory = async()=>{
  try{
    const token = localStorage.getItem('token')
    const res = await axios.get("http://localhost:8080/history/",{
      headers:{
        Authorization:token
      }
      
    }
  )
  setRes(res.data.results)
  console.log(res)
  }catch(err){

  }}
  fetchHistory();
  },[])
if(res){console.log(res[0])}
  return (
    <div>History</div>
  )
}

export default History