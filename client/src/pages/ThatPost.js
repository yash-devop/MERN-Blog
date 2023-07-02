import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const ThatPost = () => {
    const [postInfo,setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(()=>{
        fetch(`https://mern-blog-api-rho.vercel.app/post/${id}`).then((res)=>{
            res.json().then((postInfo)=>{
                setPostInfo(postInfo)
            })
        })
    },[])
    
    // if(!postInfo) return 'h1';
    if(!postInfo) return (
        <>
          <div className="loader-div"> 
            <span class="loader"></span>
          </div>
        </>
    );
    return (
        <>
            <div className='post-page'>
                <div className='post-image'>
                    <img src={`https://mern-blog-api-rho.vercel.app/uploads/${postInfo.cover}`} alt=""/>
                </div>
                <div className='post-content'>
                    <h1 className='post-title'>{postInfo.title}</h1>
                    <div dangerouslySetInnerHTML={{__html : postInfo.content}} className='post-description'/>  {/* used to print html form a string */}
                </div>
            </div>
        </>
  )
}

export default ThatPost