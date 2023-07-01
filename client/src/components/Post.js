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
    <div className='main-container'>

    <div className='landing-container'>
        <div className='landing-title'>
          <h1>Blogify</h1>
          <svg className='quote-svg' width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.73395 20.4927C4.9168 15.8595 2.38025 9.48896 2.87443 4.2987" stroke="#F2D53C" stroke-width="3" stroke-linecap="round"/>
            <path d="M10 27C13.8556 25.9229 17.7231 21.0898 19.9324 17.9884C21.8029 15.3627 23.5611 12.6512 25.4505 10.0426C27.2249 7.59265 30.2611 5.02756 31 2" stroke="#F2D53C" stroke-width="3" stroke-linecap="round"/>
            <path d="M17.1854 35.4632C23.7053 35.3146 29.4709 32.5377 35.9996 31.9621" stroke="#F2D53C" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
        <p>Explore the World of Insightful Content</p>
        <h4>Discover engaging articles, stories<br/>and perspectives on a wide range of topics.</h4>
    </div>
    <h1 className='explore'>
      Explore Blog
    </h1>
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
          <div className="loader-div"> 
            <span class="loader"></span>
          </div>
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
                                <Link to={`/post/${currelem._id}`} className='grid-title'><h1 className='grid-title'>{currelem?.title}</h1></Link>
                                <div className='arrow-icon-class'>
                                  <BsArrowUpRight className='arrow-icon'/>
                                </div>
                              </div>
                              {/* {`${currelem.summary}`.substring(0,115)+"..."} */}
                              {/* problem solved: the substring was converting a small text also lesser than 115char into ... */}
                              <p>
                                {
                                   currelem.summary.length > 115 ? currelem.summary.substring(0,115)+"..." : currelem.summary
                                }
                              </p>
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
        </>
      )
    }
    </div>
        
    </>
  )
}

export default Post