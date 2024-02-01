import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='h-screen w-full bg-gradient-to-tr from-slate-950 to-cyan-800 
      flex flex-col justify-center items-center text-center p-4 text-white'>
      <h1 className='text-4xl md:text-6xl lg:text-8xl'> Lost Train of NNTV ? </h1>
      <p className='text-xl md:text-2xl my-5 md:my-10'> We are sorry, that page is not found. You can explore on home page </p> 
      <Link to='/' className='bg-white text-black px-4 py-2 font-bold tracking-wide text-xl'> NNTV Home </Link>     
    </div>
  )
}

export default ErrorPage;
