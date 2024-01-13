import React from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoURL } from '../redux/dataReducer'

const VideoPopup = () => {
  const dispatch = useDispatch();
  const videoURL = useSelector((state) => state.dataReducer.videoURL)
  
  return (
    <>
      {videoURL?
        <div>
          <button onClick={() => dispatch(setVideoURL(''))}> Close </button>
          <ReactPlayer url={`https://youtube.com/watch?v=${videoURL}`} controls width="70vw" height="80vh"/>
        </div>
        :null
        }
    </>
  )
}

export default VideoPopup;

