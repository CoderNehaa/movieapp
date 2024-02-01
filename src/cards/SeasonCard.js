import React from 'react';

const SeasonCard = ({series, obj}) => {
  const date = new Date(obj && obj.air_date);

  return (
    <div className='m-4 lg:mx-0 lg:my-4 p-4 w-full text-justify flex shadow-sm shadow-slate-800 border-2 border-slate-800'>
      <img src={obj.poster_path?`https://image.tmdb.org/t/p/original${obj?obj.poster_path:""}`:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF3WTYXGef1YOMhhTs4Q-5mUt93-d94UV5amrD69Ns890h3XqkEaTNm9EussGuYUkPTGM&usqp=CAU"} 
        className='h-32 w-24 md:h-48 md:w-40' />
      <div className='ml-4 flex flex-col'> 
        <div className='flex'> 
          <span className='mr-2 text-xl lg:text-2xl'> {obj.name} </span> 
          <button className='bg-black text-white py-1 px-2 text-sm font-semibold rounded-lg flex items-center'> 
            <i className='fa-solid fa-star text-xs mr-1'> </i> 
            <span> {obj.vote_average} </span>
          </button>
        </div>
        <span className='my-1'> {date.getFullYear()} - {obj.episode_count} Episodes </span>
        <span> {`Season ${obj.season_number} of ${series} released on ${`${date.getDate()} ${date.toLocaleString('default', {month:'long'})}, ${date.getFullYear()}`}.`} </span>
        <p className='line-clamp-4 hidden md:block'> {obj.overview} </p>
      </div>
    </div>
  )
}

export default SeasonCard;
