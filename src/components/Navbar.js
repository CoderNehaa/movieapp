import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { dataSelector, fetchList } from '../redux/reducers/dataReducer';
import { logOut } from '../redux/reducers/userReducer';

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);
  const user = useSelector(state => state.userReducer.user);
  const { apiData } = useSelector(dataSelector);
  const { baseUrl, apiKey } = apiData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  function handleSubmit(e){
    e.preventDefault();
    const query = inputRef.current.value;
    dispatch(fetchList({type:'search', url:`${baseUrl}search/multi?query=${query}&api_key=${apiKey}`}));
    navigate('/search/results');
    inputRef.current.value = '';
    setShowSearchBar(false);
  }

  return (
    <>
    <nav className='min-w-full py-5 px-2 lg:px-4 z-10 fixed bg-slate-900 text-white 
      flex flex-wrap justify-between items-center shadow-md border-b-2 border-slate-800'>
        <div className='flex items-center'>
          <Link to='/' className='text-xl lg:text-3xl font-bold hovEff italic'> NNTV </Link>
          {/* Laptop view navbar items */}
          <Link to='/shows' className='hovEff md:ml-10 hidden md:inline'> TV Shows </Link>
          <Link to='/movies' className='hovEff md:ml-10 hidden md:inline'> Movies </Link>
          {user?<Link to='/favorites' className='hovEff md:ml-10 hidden md:inline'> Favorites </Link>:null}
        </div>

        <div className='flex items-center fixed right-1 lg:right-4'>
          <i className={`hovEff fa-solid ${showSearchBar?"fa-xmark":"fa-search"} mx-3`} 
            id='searchBtn' onClick={() => setShowSearchBar(!showSearchBar)}></i>

            <i className={`fa-solid ${showNavItems?"fa-xmark":"fa-bars"} mx-4 md:hidden`} 
              onClick={() => setShowNavItems(!showNavItems)}> </i>
            
            <div className='hidden md:flex'>
              {user
                ?<span onClick={() => dispatch(logOut())} className='mx-3 hovEff'> Log Out <i className="fa-solid fa-arrow-right-from-bracket mx-1"></i> </span>
                :<Link to='/signin' className='mx-3 hovEff'> Sign In <i className="fa-solid fa-right-to-bracket ml-1" aria-hidden="true"></i></Link>
              } 
            </div>
        </div>
    </nav>
    
    {/* Mobile view navbar items */}
    <div className={showNavItems?"flex flex-col fixed w-full top-16 text-sm z-10 bg-slate-900 text-white md:hidden":"hidden"} id='navItems'>
      <Link to='/' className='px-4 py-2' onClick={() => setShowNavItems(!showNavItems)}> Home </Link>
      <Link to='/movies' className='px-4 py-2' onClick={() => setShowNavItems(!showNavItems)}> Movies </Link>
      <Link to='/shows' className='px-4 py-2' onClick={() => setShowNavItems(!showNavItems)}> TV Shows </Link>
      {user?<Link to='/favorites' className='px-4 py-2' onClick={() => setShowNavItems(!showNavItems)}> Favorites </Link>:null}
      {user
        ?<span onClick={() => {dispatch(logOut()); setShowNavItems(!showNavItems)}} className='px-4 py-2'> Log Out <i className="fa-solid fa-arrow-right-from-bracket mx-1"></i> </span>
        :<Link to='/signin' className='px-4 py-2'> Sign In <i className="fa-solid fa-right-to-bracket mx-1" aria-hidden="true"></i></Link>
      }
    </div> 

    {/* Search bar form */}
    <div className={`z-10 w-full py-5 px-5 lg:px-20 fixed top-20 bg-zinc-300 ${showSearchBar?'flex items-center':'hidden'}`}>
      <form onSubmit={handleSubmit} className='flex relative w-full justify-between'>
        <input type='search' placeholder='Search here...' className='bg-transparent focus:outline-none relative w-full text-xl' ref={inputRef}/>
        <button type='submit'> <i className='fa-solid fa-search ml-4'></i> </button> 
      </form>
    </div> 
          
    <Outlet />
    </>
  )
}

export default Navbar;
