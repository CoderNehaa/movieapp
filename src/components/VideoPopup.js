import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoURL } from '../redux/reducers/dataReducer';
import { useNavigate } from 'react-router-dom';
import './videoPopUp.css';

const VideoPopup = () => {
  const dispatch = useDispatch();
  const videoURL = useSelector((state) => state.dataReducer.videoURL);
  const navigate = useNavigate();

  return (
    <>
      {videoURL
      ?videoURL==='unavailable'
        ?<div className='h-screen w-screen bg-black text-6xl text-zinc-500 flex justify-center items-center'> 
          OOPS ! This trailer is not available. 
        </div>
        :<div className='w-screen h-screen relative bg-black'>
            <button className='text-white' onClick={() => {dispatch(setVideoURL(''))}}> Close </button>
            <div className='relative h-full w-full flex flex-col justify-center items-center'>
              <ReactPlayer url={`https://youtube.com/watch?v=${videoURL}`} playing={true} controls width="90%" height="90%"/>
            </div>
          </div>
      :navigate(-1)
      }      
    </>
  )
}

export default VideoPopup;

