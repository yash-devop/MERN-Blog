import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'

const Blog = () => {

  const [postData,setPostData] = useState(null);
  const [isPost,  setisPost] = useState(false);
  const [recentPostData,setRecentPostData] = useState(null);
  const [isRecentPost,  setIsRecentPost] = useState(false);

  useEffect(()=>{
    fetch("https://mern-blog-api-rho.vercel.app/post").then((res)=>{
      res.json().then((posts)=>{
        console.log(posts)
        setPostData(posts)
        setisPost(true)
      })
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  useEffect(()=>{
    fetch("https://mern-blog-api-rho.vercel.app/recentpost").then((res)=>{
      res.json().then((posts)=>{
        console.log(posts)
        setRecentPostData(posts)
        setIsRecentPost(true)
      })
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  console.log("useState PostData",postData)
  return (
    <>
        <Post posts={postData} isPost={isPost} recentPost={recentPostData} isRecentPost={isRecentPost}/>
    </>
  )
}

export default Blog