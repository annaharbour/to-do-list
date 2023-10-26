import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'

export const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    })
    const {email, password} = inputValue;
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name] : value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:4000/login", 
            {
                ...inputValue
            },
            {withCredentials: true}
            );
            console.log(data);
            const {success, message} = data;
            if(success){
            setTimeout(() => {
                navigate('/')
            }, 1000)
            } else {
                setErrorMessage(message);
            }
        }
        catch(err){
            console.error(err)
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: ""
        });
    };

  return (
    <div className='App'>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email'
                   name="email"
                   value={email}
                   onChange={handleChange}
                   placeholder='Your email'
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <span>No account? <Link to="/signup">Sign up!</Link></span>
        
    </div>
  )
}
