import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TvShows = () => {
  const data = useSelector((state) => state.dataReducer.tvShows);

  return (
    <div className='relative top-16 p-8 bg-slate-900'>
      <div className='flex flex-wrap justify-center text-white'>
      { data && data.map((obj, index) => {
        return(
          <Link to={`/shows/${obj.id}`} key={index}>
            <div className='m-5 flex flex-col justify-start items-center text-center w-48 h-72 bg-slate-900'>
                <img src={`https://image.tmdb.org/t/p/original${obj?obj.poster_path:""}`} 
                  className='h-52 w-48'/>
            </div>
        </Link>
        )
      })}
      </div>
    </div>
  )
}

export default TvShows;
