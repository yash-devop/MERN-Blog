import React, { useState } from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

const Post = ({posts , isPost}) => {
  console.log("posData",posts)
  console.log("isPost?",isPost)
  return (
    <>
    {
      isPost ? (
        <>
            {
              posts.map((currelem)=>{
                console.log("CurrEleme",currelem)
                const pathData = `http://localhost:4000/uploads/${currelem.cover}`
                console.log(pathData)
                 return (
                  <>
                      <div className="posts">
                          <div className="postImg">
                            <img className="img" src={`http://localhost:4000/uploads/${currelem.cover}`}/>
                          </div>
                          <div className="texts">
                            
                              <h2 className='title'><Link to={`/post/${currelem._id}`} className='title' >{currelem?.title}</Link></h2>
                            
                            <div className="post-info">
                                <p className="author">{currelem.author?.username}</p>
                                <time>{formatISO9075(new Date(currelem.createdAt))}</time>
                                {/* <time>2023-01-06 16:45</time> */}
                            </div>
                            <p className="summary" >
                            {currelem.summary}
                            </p>
                          </div>
                      </div>
    
                  </>
                 )
              })  
            }
        </>
      ) : (
        <>
        
        </>
      )
    }
        
    </>
  )
}

export default Post