import React, { useEffect, useState } from 'react'
import '../css/login.css'
import axios from 'axios'
import { IoMdPerson } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { fetchusers, getusers, onloginsuccess } from '../redux/actions/loginactions';
import { redirect, useNavigate } from 'react-router-dom';

export default function Login() {
    const [action, setaction] = useState('Sign Up')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchusers())
    }, [])
    const userData = useSelector(state => state.users.users)
    function SignUP() {
        if (action === 'Login')
            setaction('Sign Up')
        else {
            var data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }
            if(data.name == "" || data.email == "" || data.password == "")
            {
                alert ("Input data is not Validity. Please check !!")
            }
            else{
                axios.post("http://localhost:8000/users", data)
                alert("Account Created Successfully !!");
                document.getElementById('name').value = ""
                document.getElementById('email').value = ""
                document.getElementById('password').value = ""
            }
        }
    }
    function Login() {
        if (action === 'Sign Up')
            setaction('Login')
        else {
            var data = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }
            const logedInUser = userData.filter((user) => {
                return (user.email == data.email && user.password == data.password)
            })
            if(logedInUser != null && logedInUser.length > 0)
            {
                dispatch(onloginsuccess())
                return navigate('/home')
            }
            else
                alert('Invalid User name or Password')
        }
    }
    return (
        <div className='logincontainer'>
            <div className='loginheader'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action == 'Login' ? <div></div> :
                    <div className='input'>
                        <IoMdPerson />
                        <input id='name' type='text' placeholder="Name"></input>
                    </div>}

                <div className='input'>
                    <MdOutlineEmail />
                    <input id='email' type='email' placeholder="Email Id"></input>
                </div>
                <div className='input'>
                    <RiLockPasswordFill />
                    <input id='password' type='password' placeholder="Password"></input>
                </div>
            </div>
            {action == 'Sign Up' ? <div></div> :
                <div className='forgot-password'>Lost password? <span>Click Here!</span></div>
            }
            <div className='submit-container'>
                <div
                    className={action === 'Login' ? 'submit gray' : 'submit'}
                    onClick={() => { SignUP() }}
                > Sign Up</div>
                <div
                    className={action === 'Sign Up' ? 'submit gray' : 'submit'}
                    onClick={() => { Login() }}
                > Login</div>
            </div>
        </div>
    )
}
