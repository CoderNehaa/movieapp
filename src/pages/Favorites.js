import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../cards/Card';
import CardSkeleton from "../loading-skeleton/CardSkeleton";
import { dataSelector, setLoading } from '../redux/reducers/dataReducer';
import { getFavorites } from "../redux/reducers/userReducer";

const Favorites = () => {
  const {favorites, user} = useSelector(state => state.userReducer);
  const {loading} = useSelector(dataSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user){
      dispatch(setLoading(true));
      dispatch(getFavorites());
      dispatch(setLoading(false));
    }
  }, [user]);

  return (
    <div className='relative text-white top-16 bg-slate-900 py-5 lg:py-10 px-2 lg:px-32 min-h-screen
    bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-900'>
      {user
      ?<>
        <span className='text-xl lg:text-4xl px-10'> { favorites.length?"Your Favorites":"Your fav list is empty."} </span>
        {favorites.length
        ?<div className='flex flex-wrap justify-evenly items-center'> 
          {loading && <CardSkeleton count={20} />}
          {favorites.map((obj, index) => <Card key={index} item={obj} mediaType={obj.title?"movies":"shows"} />)} 
        </div>
        :null} 
        </> 
        :<Link to = '/signin' className='text-xl lg:text-4xl px-10'> Sign in to your account. </Link>
      }   
    </div>
  )
}

export default Favorites;
