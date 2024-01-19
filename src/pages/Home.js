import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { dataSelector, fetchList } from '../redux/reducers/dataReducer';

import CarouselSlider from '../carousel/CarouselSlider';
import CardContainer from '../components/CardContainer';

const Home = () => {
  const dispatch = useDispatch();
  const {movies, tvShows, apiData} = useSelector(dataSelector);
  const {baseUrl, apiKey} = apiData;

  useEffect(() => {
    dispatch(fetchList({ url:`${baseUrl}movie/popular?api_key=${apiKey}`, type:'movies'}));
    dispatch(fetchList({url:`${baseUrl}tv/popular?api_key=${apiKey}`, type:'shows'}));
  }, [])

  // Trending, today, this week
  return (
    <div className='relative top-16 py-1 bg-slate-900 h-full min-h-screen text-white'>
      <CarouselSlider />
      <CardContainer page='shows' arr={tvShows} heading='TV shows' />
      <CardContainer page='movies' arr={movies} heading='Movies' />
    </div>
  )
}

export default Home;
