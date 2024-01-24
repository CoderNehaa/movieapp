import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../cards/Card';
import { authentication, getFavorites } from "../redux/reducers/userReducer"

const Favorites = () => {
  const favorites = useSelector(state => state.userReducer.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authentication());
    dispatch(getFavorites());
  }, []);

  return (
    <div className='relative text-white top-16 bg-slate-900 py-10 px-32 min-h-screen'>
      <span className='text-4xl'> { favorites.length?"Your Favorites":"Your fav list is empty."} </span>
      {favorites.length
      ?<div className='flex flex-wrap justify-evenly items-center'> 
        {favorites.map((obj, index) => <Card key={index} item={obj} mediaType={obj.title?"movies":"shows"} />)} 
      </div>
      :null}        
    </div>
  )
}

export default Favorites;
