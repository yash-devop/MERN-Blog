import React from 'react'
const Form = ({Login,Register}) => {
  return (
    <>
        <>
        <form action='' className='form-container'>
            <h2 className='form-type'>{window.location.pathname === "/register" ? Register : Login}</h2>
            <input type='text' placeholder='Username' className='form-inputField'/>
            <input type='password' placeholder='Password' className='form-inputField'/>
            <button className='form-button'>{window.location.pathname === "/register" ? Register : Login}</button>
        </form>
    </>
    </>
  )
}

export default Form