import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contextapi/UserContext';
// import {useCookies} from 'react-cookie'
const Navbar = () => {
  const navigate = useNavigate();
  const {userInfo,setUserInfo} = useContext(UserContext);
  const [sticky , setSticky ] = useState(0);
  const [completionBar , setCompletionBar] = useState(0);

  // http://localhost:3000/post/648462068367b9172ed96294
  const route = window.location.href.split('/');
  console.log(route[3])
  console.log(route[3]=== 'post')
  useEffect(()=>{
      // const ScrollProgressBar=()=>{
      // }
      const handleScroll =()=>{
        setSticky(window.scrollY > 150)
        // console.log("stickey",window.scrollY)
        const scrollHeight = (document.body.scrollHeight - window.innerHeight);

        if(scrollHeight){
          setCompletionBar(Number((window.scrollY / scrollHeight).toFixed(2)) * 100)
        }
        
      }

      window.addEventListener('scroll',handleScroll)
      return()=>{
        // window.removeEventListener('scroll',handleScroll)
        window.removeEventListener('scroll',handleScroll)
      }
    },[])
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
      navigate('/')
    }
    // const username = userInfo?.username
    // console.log("Username:",username)
    // console.log("Userinfo:",userInfo)
  return (
        <>
        {
          route[3] === 'post' ? (
            <>
            <header  className={`${sticky ? 'sticky' : "navigation-bar"}`}>
              <Link to='/' className='logo'>Blogify</Link>
              <nav >
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
                  <div className='user-detail'>
                    <Link to='/login' ><p className='auth'>Login</p></Link>
                    <Link to='register' ><p className='auth'>Register</p></Link>
                  </div>
                  </>
                )}
              </nav>
                <div className="nav-scroll" style={{ transform: `translateX(${completionBar - 100}%)` }}/>
                  {console.log("valuesssss:",completionBar)}
            </header>

            </>
          ) : (
            <>
            <header  className='navigation-bar'>
              <Link to='/' className='logo'>Blogify</Link>
              <nav >
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
                  <div className='user-detail'>

                    <Link to='/login'>Login</Link>
                    <Link to='register'>Register</Link>
                  </div>
                  </>
                )}
              </nav>
            </header>

            </>
          )
        }
        </>
  )
}

export default Navbar