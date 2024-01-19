import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({item, page}) => {
  const rating = item && (item.vote_average).toFixed(1);
    
  return (
    <Link to={`/${page}/${item.id}`} className='flex flex-col justify-start w-60 my-5'>
        {/* <div> */}
            <img src={`https://image.tmdb.org/t/p/original${item?item.poster_path:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF3WTYXGef1YOMhhTs4Q-5mUt93-d94UV5amrD69Ns890h3XqkEaTNm9EussGuYUkPTGM&usqp=CAU"}`} className='h-84 w-60 rounded-2xl'/>
                    
            <div className='flex justify-between items-center'>
              <span className='line-clamp-1 m-1 italic'> {item.original_title || item.name} </span>
              <button className='bg-black py-1 px-2 text-sm font-semibold rounded-lg flex items-center'> 
                <span> {rating} </span> <i className='fa-solid fa-star text-xs ml-1'> </i> 
              </button>
            </div>

        {/* </div> */}
    </Link>
  )
}

export default Card;
