import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { dataSelector, fetchList } from '../redux/reducers/dataReducer';
import { logOut } from '../redux/reducers/userReducer';

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const {apiData} = useSelector(dataSelector);
  const user = useSelector(state => state.userReducer.user);
  const { baseUrl, apiKey } = apiData
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    const query = inputRef.current.value;
    dispatch(fetchList({type:'search', url:`${baseUrl}search/multi?query=${query}&api_key=${apiKey}`}));
    navigate('/search/results');
  }

  return (
    <>
    <nav className='min-w-full bg-slate-900 text-white flex flex-wrap justify-between items-center py-5 px-2 lg:px-4 z-10 fixed shadow-md border-b-2 border-slate-800'>
        <div>
          <Link to='/' className='text-xl font-bold hover:cursor-pointer'> Brand Name </Link>
          <Link to='/shows' className='mx-5 lg:ml-10 hidden lg:inline hover:cursor-pointer'> TV Shows </Link>
          <Link to='/movies' className='mx-5 hidden lg:inline hover:cursor-pointer'> Movies </Link>
          <Link to='/favorites' className='mx-5 hidden lg:inline hover:cursor-pointer'> Favorites </Link>
        </div>

        <div className='flex items-center fixed right-1 lg:right-4'>
          <i className={`hover:cursor-pointer ${showSearchBar?"fas fa-xmark mx-3":"fa-solid fa-search mx-3"}`} 
            id='searchBtn' onClick={() => setShowSearchBar(!showSearchBar)}></i>
          <i className="fas fa-bell mx-3 hover:cursor-pointer"></i>
          <Link to='/signin'> <i className="fa fa-user-circle mx-3 hover:cursor-pointer" aria-hidden="true"></i> 
            {user && user.name} 
          </Link>
          <span onClick={() => dispatch(logOut())}> <i className="fa-solid fa-arrow-right-from-bracket ml-3"></i> </span>
        </div>
    </nav>

    <div className="fixed top-16 p-2 border-2 min-w-full flex items-center text-sm lg:hidden">
            <Link to='/shows' className='mx-2 hover:cursor-pointer'> TV Shows </Link>
            <Link to='/movies' className='mx-2'> Movies </Link>
            <Link to='/favorites' className='mx-2 hover:cursor-pointer'> Favorites </Link>
    </div>

    <div className={`z-10 w-full py-5 px-5 fixed top-20 bg-zinc-300 ${showSearchBar?'flex items-center':'hidden'}`} id='searchBar'> 
      <i className="fas fa-search mx-4"></i>
      <form onSubmit={handleSubmit}>
        <input type='search' placeholder='Search here...' className='w-[1500px] bg-transparent focus:outline-none' ref={inputRef}/> 
      </form>
    </div>
          
    <Outlet />
    </>
  )
}

export default Navbar;
