import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contextapi/UserContext';
import {MdLogout,MdOutlineCreate} from 'react-icons/md'
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
        window.removeEventListener('scroll',handleScroll)
      }
    },[])
    useEffect(()=>{
      const cookies = fetch("https://mern-blog-api-rho.vercel.app/profile",{
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
      fetch('https://mern-blog-api-rho.vercel.app/logout',{
        credentials : "include",
        method: 'POST'
      })
      setUserInfo("");
      // window.location.reload(); 
      navigate('/')
    }

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
                    <Link to={'/create'}><button className='create-post'>Create Post<MdOutlineCreate className='logout-icon'/></button></Link>
                    <button className='logout' onClick={logout}>Logout<MdLogout/></button>
                  </div>
                      
                  </>
                ) : (
                  <>
                  <div className='user-detail'>
                    <Link to='/login' className='auth'><p className='auth'>Login</p></Link>
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
                    <Link to={'/create'}><button className='create-post'>Create Post<MdOutlineCreate className='logout-icon'/></button></Link>
                    <button className='logout' onClick={logout}>Logout<MdLogout className='logout-icon'/></button>
                  </div>
                      
                  </>
                ) : (
                  <>
                  <div className='user-detail'>
                    <Link to='/login' className='auth'><p className='auth'>Login</p></Link>
                    <Link to='register' ><p className='auth'>Register</p></Link>
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