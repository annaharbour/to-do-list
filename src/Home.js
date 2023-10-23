import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ToDoList from './ToDoList';

export const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [username, setUsername] = useState('');

  const Logout = () => {
    removeCookie('token');
    navigate('/signup');
  };

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/login');
      }
      const { data } = await axios.post(
        'http://localhost:4000',
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? 
        // toast(`Hello ${user}`, {
        //     position: 'top-right',
        //   })
        <ToDoList/>
        // Render to do list for user
        : (removeCookie('token'), navigate('/login'));
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <div>
      <ToDoList/>
      <button className="logout" onClick={Logout}>Logout</button>
      <ToastContainer />
    </div>
  );
};
