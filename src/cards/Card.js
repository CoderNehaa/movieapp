import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({item, mediaType}) => {

  if(!item.poster_path){
    return;
  }
  
  const rating = item.vote_average && (item.vote_average).toFixed(1);
  
  return (
    <Link to={`/${mediaType}/${item.id}`} className='flex flex-col justify-start w-60 my-5'>
      <img src={`https://image.tmdb.org/t/p/original${item?item.poster_path:""}`} className='rounded-2xl' />
      <div className='flex justify-between items-center'>
        <span className='line-clamp-1 m-1 italic'> {item.original_title || item.name} </span>
        <button className='bg-black py-1 px-2 text-sm font-semibold rounded-lg flex items-center'> 
          <span> {rating} </span> <i className='fa-solid fa-star text-xs ml-1'> </i> 
        </button>
      </div>
    </Link>
  )
}

export default Card;
