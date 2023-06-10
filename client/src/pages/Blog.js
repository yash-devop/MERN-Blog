import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'

const Blog = () => {

  const [postData,setPostData] = useState(null);
  const [isPost,  setisPost] = useState(false);

  useEffect(()=>{
    fetch("http://localhost:4000/post").then((res)=>{
      res.json().then((posts)=>{
        console.log(posts)
        setPostData(posts)
        setisPost(true)
      })
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  console.log("useState PostData",postData)
  return (
    <>
        <Post posts={postData} isPost={isPost}/>
    </>
  )
}

export default Blog