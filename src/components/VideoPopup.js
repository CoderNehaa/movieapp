import React from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoURL } from '../redux/reducers/dataReducer';

const VideoPopup = () => {
  const dispatch = useDispatch();
  const videoURL = useSelector((state) => state.dataReducer.videoURL);

  return (
    <div className={videoURL?`h-full w-full fixed left-0 top-0 flex flex-col justify-center items-center backdrop-blur-xl backdrop-brightness-50 z-20`:`hidden`}>
      <div className='w-screen h-72 md:h-96 md:w-4/5 lg:h-2/5 xl:h-3/5 xl:w-3/5'>
        <button className='text-white' onClick={() => dispatch(setVideoURL(null))}> Close</button>
        <div className='bg-white h-full'>
          <ReactPlayer url={`https://youtube.com/watch?v=${videoURL}`} playing={true} controls width="100%" height="100%"/>
        </div>
      </div>
    </div>
  )
}

export default VideoPopup;

