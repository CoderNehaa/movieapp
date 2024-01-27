import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Card from '../cards/Card';
import { authentication, getFavorites } from "../redux/reducers/userReducer"
import VideoPopup from '../components/VideoPopup';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const {favorites, user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authentication());
    dispatch(getFavorites());
    if(!user){
      navigate('/signin');
    }
  }, []);

  return (
    <div className='relative text-white top-16 bg-slate-900 py-5 lg:py-10 px-2 lg:px-32 min-h-screen'>
      <span className='text-xl lg:text-4xl px-10'> { favorites.length?"Your Favorites":"Your fav list is empty."} </span>
      {favorites.length
      ?<div className='flex flex-wrap justify-evenly items-center'> 
        {favorites.map((obj, index) => <Card key={index} item={obj} mediaType={obj.title?"movies":"shows"} />)} 
      </div>
      :null}  
      <VideoPopup />      
    </div>
  )
}

export default Favorites;
