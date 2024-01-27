import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, fetchList } from '../redux/reducers/dataReducer';

import CarouselSlider from '../carousel/CarouselSlider';
import CardContainer from '../components/CardContainer';
import { getFavorites } from '../redux/reducers/userReducer';
import VideoPopup from "../components/VideoPopup";
import Footer from '../components/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const {movies, tvShows, apiData} = useSelector(dataSelector);
  const favorites = useSelector((state) => state.userReducer.favorites);
  const {baseUrl, apiKey} = apiData;

  useEffect(() => {
    dispatch(getFavorites());
    if(!movies.length){
      dispatch(fetchList({ url:`${baseUrl}movie/popular?api_key=${apiKey}&append_to_response=videos`, type:'movies'}));
    }
    if(!tvShows.length){
      dispatch(fetchList({url:`${baseUrl}tv/popular?api_key=${apiKey}&append_to_response=videos`, type:'shows'}));
    }
  }, [])

  // Trending, today, this week
  return (
    <div className='relative top-16 py-1 bg-slate-900 h-full min-h-screen text-white'>
      <CarouselSlider />
      {favorites && <CardContainer arr={favorites} heading='Your Favorites' page="favorites" />}
      <CardContainer mediaType='shows' arr={tvShows} heading='TV shows' page="shows" />
      <CardContainer mediaType='movies' arr={movies} heading='Movies' page="movies" />
      <Footer />
      <VideoPopup />
    </div>
  )
}

export default Home;
