import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../contextapi/UserContext';
// import {useCookies} from 'react-cookie'
const Navbar = () => {
  const {userInfo,setUserInfo} = useContext(UserContext);
  useEffect(()=>{
      const cookies = fetch("http://localhost:4000/profile",{
        credentials : "include"
      })
      .then((response)=>{
          response.json().then((userdata)=>{
            setUserInfo(userdata)
            console.log("userData",userdata)
          })
      })
    },[])
    const logout=()=>{
      fetch('http://localhost:4000/logout',{
        credentials : "include",
        method: 'POST'
      })
      setUserInfo("");
    }
    // const username = userInfo?.username
    // console.log("Username:",username)
    // console.log("Userinfo:",userInfo)
  return (
        <>
            <header>
              <Link to='/' className='logo'>MyBlog</Link>
              <nav>
                {console.log(
                  "userInfo", userInfo
                )}
                {userInfo.username ? (
                  <>
                  <div className='user-detail'>
                    <p className='welcome-user'>{`Welcome,${userInfo?.username}`}</p>
                    <Link to={'/create'}><button className='create-post'>Create Post</button></Link>
                    <button className='logout' onClick={logout}>Logout</button>
                  </div>
                      
                  </>
                ) : (
                  <>
                    <Link to='/login'>Login</Link>
                    <Link to='register'>Register</Link>
                  </>
                )}
              </nav>
            </header>
        </>
  )
}

export default Navbar