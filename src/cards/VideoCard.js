import React from 'react';
import { setVideoURL } from '../redux/reducers/dataReducer';
import { useDispatch } from 'react-redux';

const VideoCard = ({video}) => {
  const dispatch = useDispatch();
  
  return (
    <div className='flex flex-col items-start mr-4 cursor-pointer w-72 relative' onClick={() => dispatch(setVideoURL(video.key))}>
      <div className='w-36 md:w-52 lg:w-72'>
        <img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} className='h-28 md:h-36 lg:h-48 w-full' />
      </div>
      <span className='text-xs md:text-base p-1'> {video.name} </span>
    </div>
  )
}

export default VideoCard;
