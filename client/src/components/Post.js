import React, { useState } from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'
import {BsArrowUpRight} from 'react-icons/bs'
const Post = ({posts , isPost , recentPost , isRecentPost}) => {

  console.log("posData",recentPost)
  console.log("isPost?",isRecentPost)

  const [hovered , setHovered] = useState(false)
  const hoverFunction=()=>{
    setHovered(true)
    console.log("hovereddddD",hovered)
  }
  return (
    <>
    {
      isPost ? (
        <>
            {
              posts?.map((currelem)=>{
                console.log("CurrEleme",currelem)
                const pathData = `http://localhost:4000/uploads/${currelem.cover}`
                console.log(pathData)
                 return (
                  <>
                      <div className="posts">
                          <div className="postImg">
                            <img className="img" src={`http://localhost:4000/uploads/${currelem.cover}`}/>
                          </div>
                          <div className='posts-content'>
                              <h2 className='title'><Link to={`/post/${currelem._id}`} className='title' >{currelem?.title}</Link></h2>
                              <p className="summary" >
                              {currelem.summary}
                              </p>
                              <div className='posts-credits'>
                                <div className='posts-members'>
                                   <p className='written'>Written by</p>
                                   <p className="author">{currelem.author?.username}</p>
                                </div>
                                <div className='post-published'>
                                   <p className='written'>Published on</p>
                                   <time>{formatISO9075(new Date(currelem.createdAt))}</time>
                                </div>
                              </div>
                          </div>

                      </div>
                     
                  </>
                 )
              })  
            }
        </>
      ) : (
        <>
            <h1>Didnt Got the Data from backend.</h1>
        </>
      )
    }
    {
      isRecentPost ? (
        <>
          <div className='related-article-container'>
              <h1>Related Posts</h1>
               <div className='grid-article'>
                  <>
                    {/* Related Posts */}
                    {
                      recentPost?.map((currelem)=>{
                        return(
                        <div className='grid-article-contents' >
                            <div className='grid-article-image'>
                                <img className='img' src={`http://localhost:4000/uploads/${currelem.cover}`}/>
                            </div>
                            <div>
                              <div className='grid-article-title' onMouseEnter={hoverFunction}>
                                <h1><Link to={`/post/${currelem._id}`} className='title' >{currelem?.title}</Link></h1>
                                <BsArrowUpRight size={30} className={`arrow-icon ${hovered ? 'hovered' : ""}`} />
                              </div>
                              <p>{`${currelem.summary}`.substring(0,100)+"..."}</p>
                            </div>

                        </div>)
                      })
}
                  </>            
            </div>
            </div>
        </>
      ) : (
        <>
            <h1>Didnt Got the Data from backend.</h1>
        </>
      )
    }
        
    </>
  )
}

export default Post