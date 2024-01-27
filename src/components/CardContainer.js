import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HorizontalScroll from '../carousel/HorizontalScroll';
import { useDispatch, useSelector } from 'react-redux';
import {findTrailer} from '../redux/reducers/dataReducer';
import { addToFavorites } from '../redux/reducers/userReducer';

const CardContainer = ({heading, arr, page}) => {
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='my-3 lg:my-8 pl-2 lg:pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-base lg:text-2xl my-2'> {heading}  </span> 
          <Link to={`/${page}`} className='text-xs '> <i className='fa-solid fa-angles-right'> </i> </Link> 
        </div>   
        <HorizontalScroll>
          {arr && arr.map((obj, index) => 
              <div className='mr-2 relative hover:cursor-pointer card' key={index}>
                <div className='h-32 w-28 lg:h-72 lg:w-60'>
                  <img src={`https://image.tmdb.org/t/p/original${obj?obj.poster_path:""}`} className='h-full w-full'/>
                </div>
                <div className='absolute bottom-0 bg-gradient-to-r from-black p-2 lg:p-4 hoverStyle flex items-center invisible'>
                  <Link to={page==='favorites'?obj.title?`/movies/${obj.id}`:`/shows/${obj.id}`:`/${page}/${obj.id}`}>
                    <i className='fa-solid fa-info-circle text-2xl lg:text-5xl mx-2'> </i>
                  </Link>
                  
                  <i className='fa-solid fa-circle-play text-2xl lg:text-5xl mr-2 hover:cursor-pointer' 
                    onClick={() => dispatch(findTrailer({id:obj.id, type:page==="favorites"?obj.title?"movie":"tv":obj.title?"movie":"tv"}))}> </i>
                  
                  <button onClick={() => {user?dispatch(addToFavorites(obj)):navigate('/signin')}} 
                    className='h-6 w-6 lg:h-12 lg:w-12 text-base lg:text-xl bg-white text-black rounded-full'> 
                    <i className='fa-solid fa-heart hover:cursor-pointer'> </i>
                  </button>
               
                </div>
              </div>
          )}   
        </HorizontalScroll>
      </div>
  )
}

export default CardContainer;
