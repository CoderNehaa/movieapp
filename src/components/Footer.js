import React from 'react';

const Footer = () => {
  return (
    <div className='px-24 py-16 bg-gray-950 mt-20 flex flex-col items-center'>
        {/* Brand name, slogan and description */}
            <h1 className='text-2xl italic'> Moviemagic </h1>
            <span className='text-xl font-bold my-4 text-gray-500'> All the magic of movies in one app </span>
            <p className='text-lg'> 
                Explore an immersive React project featuring a diverse array of TV shows, movies, trailers, and videos. Effortlessly discover content with genre filters and a user-friendly search functionality. Enjoy a seamless experience with smooth loading, and curate a personalized favorites list that persists post-login. Explore an immersive React project featuring a diverse array of TV shows, movies, trailers, and videos. Effortlessly discover content with genre filters and a user-friendly search functionality. Enjoy a seamless experience with smooth loading, and curate a personalized favorites list that persists post-login. 
            </p>
            
            <div className='flex justify-center my-10 text-cyan-500 w-full text-base'>
                <span className='mr-10 hover:text-yellow-600 hover:cursor-pointer'> About us </span>
                <span className='mr-10 hover:text-yellow-600 hover:cursor-pointer'> Terms & conditions </span>
                <span className='mr-10 hover:text-yellow-600 hover:cursor-pointer'> Privacy Policy </span>
                <span className='mr-10 hover:text-yellow-600 hover:cursor-pointer'> Send Feedback </span>
                <span className='mr-10 hover:text-yellow-600 hover:cursor-pointer'> Help </span>
                <span className='mr-10 hover:text-yellow-600 hover:cursor-pointer'> Contact us </span>
            </div>

            {/* Social Media list */}
            <div className='flex text-slate-500 text-xl'>
                <i className='fa-brands fa-instagram mr-10 hover:cursor-pointer'> </i>
                <i className='fa-brands fa-twitter mr-10 hover:cursor-pointer'> </i>
                <i className='fa-brands fa-facebook mr-10 hover:cursor-pointer'> </i>
            </div>
        </div>
  )
}

export default Footer
