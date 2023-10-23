import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export const SignUp = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        username: "",
        password: ""
    })
    const {email, username, password} = inputValue;
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name] : value
        });
    }
    const handleSuccess = (message) => {
        toast.success(message, {
            position: "top-right"
        })
    }
    const handleError = (err) => {
        toast.error(err, {
            position: "top-right"
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:4000/signup", 
            {
                ...inputValue
            },
            {withCredentials: true}
            );
            const {success, message} = data;
            if(success){
                // handleSuccess(message);
            setTimeout(() => {
                navigate('/')
            }, 1000)
            } else {
                handleError(message);
            }
        }
        catch(err){
            console.error(err)
        }
    }

  return (
    <div className='App'>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email'
                   name="email"
                   value={email}
                   onChange={handleChange}
                   placeholder='Your email'
            />
            <label htmlFor='username'>Username</label>
            <input type="username"
                   name="username"
                   value={username}
                   onChange={handleChange}
                   placeholder='Your username'
            />
            <label htmlFor='password'>Password</label>
            <input type="password"
                   name="password"
                   value={password}
                   onChange={handleChange}
                   placeholder="Your password"
            />
            <button className="signin-signup" type="submit">Submit</button>
        </form>
        <span>Already have an account? <Link to="/login">Sign in!</Link></span>
        <ToastContainer/>
    </div>
  )
}
