import React, { useState } from 'react'
import {formatISO9075} from 'date-fns'

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
                            <img src={pathData}></img>
                          </div>
                          <div className="texts">
                            <h2>{currelem?.title}</h2>
                            <div className="post-info">
                                <p className="author">{currelem.author?.username}</p>
                                <time>{formatISO9075(new Date(currelem.createdAt))}</time>
                                {/* <time>2023-01-06 16:45</time> */}
                            </div>
                            <p className="summary" >
                            Meet Sophie, a Senior Growth Marketing Manager and digital nomad. Her story is a riveting blend of professional growth, remote work challenges, and an infectious zest for life. Strap in as we journey through time zones, and share marketing insights all from Sophie's 'office'—the world.
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