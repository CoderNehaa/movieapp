import React from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoURL } from '../redux/reducers/dataReducer';

const VideoPopup = () => {
  const dispatch = useDispatch();
  const videoURL = useSelector((state) => state.dataReducer.videoURL);

  return (
    <div className={videoURL?`h-full w-full fixed left-0 top-0 flex flex-col justify-center items-center backdrop-blur-xl backdrop-brightness-50 z-20`:`hidden`}>
      <div>
        <button className='text-white' onClick={() => dispatch(setVideoURL(null))}> Close</button>
        <div className='bg-white'>
          <ReactPlayer url={`https://youtube.com/watch?v=${videoURL}`} playing={true} controls width="50vw" height="60vh"/>
        </div>
      </div>
    </div>
  )
}

export default VideoPopup;

