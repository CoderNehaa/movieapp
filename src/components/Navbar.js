import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  function handleClick(){
    setShowSearchBar(!showSearchBar);
  }

  return (
    <>
    <nav className='min-w-full bg-slate-900 text-white flex flex-wrap justify-between items-center py-5 px-2 lg:px-4 z-10 fixed shadow-md border-b-2 border-slate-800'>
        <div>
          <Link to='/' className='text-xl font-bold hover:cursor-pointer'> Brand Name </Link>
          <Link to='/shows' className='mx-5 lg:ml-10 hidden lg:inline hover:cursor-pointer'> TV Shows </Link>
          <Link to='/movies' className='mx-5 hidden lg:inline hover:cursor-pointer'> Movies </Link>
          <Link to='/favorites' className='mx-5 hidden lg:inline hover:cursor-pointer'> My List </Link>
        </div>
        <div className='flex fixed right-1 lg:right-4'>
          <i className={`hover:cursor-pointer ${showSearchBar?"fas fa-xmark mx-3":"fa-solid fa-search mx-3"}`} id='searchBtn' onClick={() => handleClick()}></i>
          <i className="fas fa-bell mx-3 hover:cursor-pointer"></i>
          <i className="fa fa-user-circle mx-3 hover:cursor-pointer" aria-hidden="true"></i>
        </div>
    </nav>

    <div className={`fixed top-16 p-2 border-2 min-w-full flex items-center text-sm lg:hidden`}>
            <Link to='/shows' className='mx-2 hover:cursor-pointer'> TV Shows </Link>
            <Link to='/movies' className='mx-2'> Movies </Link>
            <Link to='/favorites' className='mx-2 hover:cursor-pointer'> My List </Link>
    </div>

    <div className={`z-10 w-full py-5 px-5 fixed top-20 bg-zinc-300 ${showSearchBar?'flex items-center':'hidden'}`} id='searchBar'> 
      <i className="fas fa-search mx-4"></i>
      <input type='search' placeholder='Search here...' className='w-full bg-transparent focus:outline-none'/> 
    </div>
          
    <Outlet />
    </>
  )
}

export default Navbar;
