import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import { useNavigate } from 'react-router';
import { UserContext } from '../contextapi/UserContext';

const Login = () => {
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();

  const {setUserInfo} = useContext(UserContext);

  const login=async(e)=>{
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/login',{
            method: "POST",
            body : JSON.stringify({username , password}),
            headers: {'Content-type' : 'application/json'},
            credentials: "include",  // enabling to add the cookies.. from the server 
        })
        console.log(response)
        if(response.status === 200){
          response.json().then((userInfo)=>{
            setUserInfo(userInfo)
            navigate('/')
          })
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
        <form action='' className='form-container' onSubmit={login}>
            <h2 className='form-type'>Login</h2>
            <input type='text' placeholder='Username' className='form-inputField' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type='password' placeholder='Password' className='form-inputField' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='form-button'>Login</button>
        </form>
        {/* <Form Login={'Login'}/> */}
    </>
  )
}

export default Login