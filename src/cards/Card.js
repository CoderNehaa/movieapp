import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({item}) => {
  return (
    <Link to={`/movies/${item.id}`}>
        <div className='m-5 flex flex-col justify-start items-center text-center w-48 h-72 bg-slate-800'>
            <img src={`https://image.tmdb.org/t/p/original${item?item.poster_path:""}`} className='h-52 w-48'/>
            <span> {item.original_title} </span>
        </div>
    </Link>
  )
}

export default Card;
