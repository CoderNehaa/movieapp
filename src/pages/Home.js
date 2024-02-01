import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, fetchGenres, setLoading } from '../redux/reducers/dataReducer';

import CarouselSlider from '../carousel/CarouselSlider';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import Skeleton from 'react-loading-skeleton';

const Home = () => {
  const { movieGenresList, tvGenresList, loading } = useSelector(dataSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchGenres('movie'));
    dispatch(fetchGenres('tv'));
    dispatch(setLoading(false));
  }, []);

  // Trending, today, this week
  return (
    <div className='relative top-16 py-1 bg-slate-900 h-full text-white'>
      <CarouselSlider />
      {loading
      ?<div className='h-32 md:h-48 lg:h-72 w-full mt-4'> <Skeleton height={"100%"} width={"100%"} count={20} /></div>
      :<>
        {tvGenresList && tvGenresList.map((genre, index) => (
          <CardContainer key={index} media='tv' genre={genre} />
        ) )}
        {movieGenresList && movieGenresList.map((genre, index) => <CardContainer key={index} media='movie' genre={genre} />)}
      </>
      }
      <Footer />
    </div>
  )
}

export default Home;
