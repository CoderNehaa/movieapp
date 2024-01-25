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
    <div className='my-8 pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-2xl my-2'> {heading}  </span> 
          <Link to={`/${page}`} className='text-xs '> <i className='fa-solid fa-angles-right'> </i> </Link> 
        </div>   
        <HorizontalScroll>
          {arr && arr.map((obj, index) => 
              <div className='mr-2 relative hover:cursor-pointer card' key={index}>
                <div className='h-72 w-60'>
                  <img src={`https://image.tmdb.org/t/p/original${obj?obj.poster_path:""}`} className='h-full w-full'/>
                </div>
                <div className='absolute bottom-0 bg-gradient-to-r from-black p-4 invisible hoverStyle flex items-center'>
                  <Link to={page==='favorites'?obj.title?`/movies/${obj.id}`:`/shows/${obj.id}`:`/${page}/${obj.id}`}>
                    <i className='fa-solid fa-info-circle text-5xl mx-2'> </i>
                  </Link>
                  
                  <i className='fa-solid fa-circle-play text-5xl mr-2 hover:cursor-pointer' 
                    onClick={() => dispatch(findTrailer({id:obj.id, type:page==="favorites"?obj.title?"movie":"tv":obj.title?"movie":"tv"}))}> </i>
                  
                  <button onClick={() => {user?dispatch(addToFavorites(obj)):navigate('/signin')}} 
                    className='h-12 w-12 text-xl bg-white text-black rounded-full'> 
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
