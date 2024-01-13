import React from 'react';
import { useDispatch } from 'react-redux';
import { setVideoURL } from '../redux/reducers/dataReducer';

const VideoCard = ({video}) => {
  const dispatch = useDispatch();
  
  return (
    <>
      <div className='flex flex-col items-start m-2 cursor-pointer' onClick={() => dispatch(setVideoURL(video.key))}>
          <div className='w-36 lg:w-72'>
            <img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
          </div>
          <span className='text-sm p-1'> {video.name} </span>
      </div>
    </>
  )
}

export default VideoCard;
