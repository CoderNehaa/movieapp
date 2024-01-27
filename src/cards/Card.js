import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {findTrailer} from "../redux/reducers/dataReducer";
import { addToFavorites, userSelector } from '../redux/reducers/userReducer';

const Card = ({item, mediaType}) => {
  const user = useSelector(userSelector).user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(!item.poster_path){
    return;
  }  
  const rating = item.vote_average && (item.vote_average).toFixed(1);
  
  return (
    <div className='flex flex-col justify-start w-32 md:w-48 lg:w-60 my-5 relative 
      hover:scale-110 hover:transition-all hover:cursor-pointer card'>
      <div className='w-32 h-40 md:w-48 md:h-56 lg:w-60 lg:h-72 xl:h-80 sticky'>
        <img src={`https://image.tmdb.org/t/p/original${item?item.poster_path:""}`} className='rounded-2xl w-full h-full' />
      </div>

      <div className='absolute bottom-8 bg-gradient-to-r from-black p-2 lg:p-4 invisible flex flex-col hoverStyle'>
        <p className='line-clamp-3 xl:line-clamp-4 text-xs lg:text-lg mb-1 lg:mb-4'> {item.overview} </p>
        <div className='flex items-center'>
          <Link to={`/${mediaType}/${item.id}`} ><i className='fa-solid fa-info-circle text-2xl lg:text-5xl mr-2'> </i></Link>
          <i className='fa-solid fa-circle-play text-2xl lg:text-5xl mr-2' 
            onClick={ () => dispatch(findTrailer({id:item.id, type:mediaType==="movies"?"movie":"tv"}))}> </i>          
          
          <button onClick={() => {user?dispatch(addToFavorites(item)):navigate('/signin')}} 
            className='h-6 w-6 lg:h-12 lg:w-12 lg:text-xl bg-white text-black rounded-full'> 
            <i className='fa-solid fa-heart hover:cursor-pointer'> </i>
          </button>
        </div>
      </div>
      
      <div className='flex justify-between items-center'>
        <span className='line-clamp-1 m-1 italic'> {item.original_title || item.name} </span>
        <button className='bg-black py-1 px-2 text-sm font-semibold rounded-lg flex items-center'> 
          <span> {rating} </span> <i className='fa-solid fa-star text-xs ml-1'> </i> 
        </button>
      </div>
      
    </div>
  )
}

export default Card;
