import React from 'react';

const Footer = () => {
  return (
    <div className='px-4 lg:px-24 py-8 lg:py-16 bg-gray-950 mt-8 lg:mt-20 flex flex-col items-center text-center'>
        {/* Brand name, slogan and description */}
            <h1 className='text-xl italic'> Moviemagic </h1>
            <span className='text-lg font-bold my-1 text-gray-500'> All the magic of movies in one app </span>
            <div className='flex text-cyan-500 text-xl my-5 lg:flex-row'>
                    <i className='fa-brands fa-instagram mr-5 lg:mr-10 hover:cursor-pointer'> </i>
                    <i className='fa-brands fa-twitter mr-5 lg:mr-10 hover:cursor-pointer'> </i>
                    <i className='fa-brands fa-facebook mr-5 lg:mr-10 hover:cursor-pointer'> </i>
                    <i className='fa-brands fa-youtube lg:mr-10 hover:cursor-pointer'> </i>
                </div>

            <p className='text-base text-gray-400 lg:text-lg lg:line-clamp-none line-clamp-4'> 
                Explore an immersive React project featuring a diverse array of TV shows, movies, trailers, and videos. Effortlessly discover content with genre filters and a user-friendly search functionality. Enjoy a seamless experience with smooth loading, and curate a personalized favorites list that persists post-login. Explore an immersive React project featuring a diverse array of TV shows, movies, trailers, and videos. Effortlessly discover content with genre filters and a user-friendly search functionality. Enjoy a seamless experience with smooth loading, and curate a personalized favorites list that persists post-login. 
            </p>
            <div className='w-full flex py-6 lg:my-5 justify-evenly lg:text-lg'>
                <div className='text-gray-500 text-sm flex flex-col lg:flex-row'>
                        <span className='lg:mr-10 m-1 hover:text-yellow-600 hover:cursor-pointer'> About us </span>
                        <span className='lg:mr-10 m-1 hover:text-yellow-600 hover:cursor-pointer'> Terms & Conditions </span>
                        <span className='lg:mr-10 m-1 hover:text-yellow-600 hover:cursor-pointer'> Privacy Policy </span>
                        <span className='lg:mr-10 m-1 hover:text-yellow-600 hover:cursor-pointer'> Cookie Preferences </span>
                </div>
                <div className='text-gray-500 text-sm flex flex-col lg:flex-row'>
                    <span className='lg:mr-10 m-1 hover:text-yellow-600 hover:cursor-pointer'> Media Centre </span>
                    <span className='lg:mr-10 m-1 hover:text-yellow-600 hover:cursor-pointer'> Help Centre </span>
                    <span className='lg:mr-10 m-1 hover:text-yellow-600 hover:cursor-pointer'> Send feedback </span>
                    <span className='lg:mr-10 m-1 hover:text-yellow-600 hover:cursor-pointer'> Contact us </span>
                </div>
            </div>

        </div>
  )
}

export default Footer;
