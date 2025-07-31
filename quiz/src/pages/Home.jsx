import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import {bg} from '../assets/image'
import Dashboard from '../components/Dashboard';
const Home = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expTime - currentTime;

        if (timeLeft <= 0) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        } else {
          setLoggedUser(user);
          setSecondsLeft(Math.floor(timeLeft / 1000)); 

          const logoutTimeout = setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
          }, timeLeft);

          const countdownInterval = setInterval(() => {
            setSecondsLeft(prev => {
              if (prev <= 1) {
                clearInterval(countdownInterval);
              }
              return prev - 1;
            });
          }, 1000);

          return () => {
            clearTimeout(logoutTimeout);
            clearInterval(countdownInterval);
          };
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, []);



  return (
    <div className="bac min-h-screen">
      
      <Header></Header>
      <Dashboard></Dashboard>
      



      
    </div>
  );
};

export default Home;
