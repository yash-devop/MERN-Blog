import React from 'react'
import {useState} from 'react'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import axios from 'axios'
const Register = () => {

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const register=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/register',{
                method: "POST",
                body : JSON.stringify({username , password}),
                headers: {'Content-type' : 'application/json'}
            })
            console.log(response)
            if(response.status === 200){
                alert('Registration Successful')
            }
            else{
                alert('Registration Failed , try again later')
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
        <form action='' className='form-container' onSubmit={(e)=>register(e)}>
            <h2 className='form-type'>Register</h2>
            <input type='text' placeholder='Username' className='form-inputField' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type='password' placeholder='Password' className='form-inputField' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='form-button'>Register</button>
        </form>
            {/* <Form Register={'Register'}/> */}
        </>
      )
}

export default Register