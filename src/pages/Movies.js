import React from 'react';
import Card from '../cards/Card';
import { useSelector } from 'react-redux';

const Movies = () => {
  const data = useSelector((state) => state.dataReducer.movies);

  return (
    <div className='relative top-16 p-8 bg-slate-900'>
      <div className='flex flex-wrap justify-center text-white'>
      { data && data.map((obj, index) => <Card item={obj} key={index}/>)}
      </div>
    </div>
  )
}

export default Movies;
