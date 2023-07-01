import React from 'react'
import {BiArrowToTop} from 'react-icons/bi'
const ScrollTop = () => {
    const scrollToTop=()=>{
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
    }
  
  return (
    <>
        <div className='scrolltoTop-container'>
            <button onClick={scrollToTop}>Back to Top<BiArrowToTop className='arrow-top'/></button>
        </div>
    </>
  )
}

export default ScrollTop