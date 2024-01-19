import React from 'react';
import { Link } from 'react-router-dom';
import HorizontalScroll from '../carousel/HorizontalScroll';

const CardContainer = ({heading, arr, page}) => {
  return (
    <div className='my-8 pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-2xl my-2'> {heading}  </span> 
          <Link to={`/${page}`} className='text-xs '> <i className='fa-solid fa-angles-right'> </i> </Link> 
        </div>   
        <HorizontalScroll>
          {arr && arr.map((obj, index) => 
            <Link to={`/${page}/${obj.id}`} key={index}>
              <div className='w-60 mr-2'>
                <img src={`https://image.tmdb.org/t/p/original${obj?obj.poster_path:""}`} className='h-72 w-60'/>
              </div>
          </Link>
          )}   
        </HorizontalScroll>
      </div>
  )
}

export default CardContainer
