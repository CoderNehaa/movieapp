import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMovies, fetchTVshows } from '../redux/dataReducer';
import HorizontalScroll from '../components/carousel/HorizontalScroll';
import CarouselSlider from '../components/carousel/CarouselSlider';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.dataReducer.movies);
  const tvShows = useSelector((state) => state.dataReducer.tvShows);
  const [historicalMovies, setHistoricalMovies] = useState([])
  const [koreanDrama, setKoreanDrama] = useState([]);
  
  useEffect(() => {
    dispatch(fetchMovies('https://api.themoviedb.org/3/movie/popular?api_key=a85f0e9195796914174fd0bde91a48bc'));
    dispatch(fetchTVshows('https://api.themoviedb.org/3/tv/popular?api_key=a85f0e9195796914174fd0bde91a48bc'));
  }, [])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/search/tv?query=korean&api_key=a85f0e9195796914174fd0bde91a48bc')
    .then(res => res.json())
    .then(data => setKoreanDrama(data.results))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/search/movie?query=history&api_key=a85f0e9195796914174fd0bde91a48bc')
    .then(res => res.json())
    .then(data => setHistoricalMovies(data.results))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className='relative top-16 py-1 bg-slate-900 h-full min-h-screen text-white'>
      <CarouselSlider />
      <div className='my-8 pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-2xl my-2'> Your Favorites  </span> 
          <Link to='/favorites' className='text-xs '> <i className='fa-solid fa-angles-right'> </i> </Link> 
        </div>   
        <HorizontalScroll>
          {movies && movies.map((movie, index) => 
            <Link to={`/movies/${movie.id}`} key={index}>
              <div className='w-60 mr-2'>
                <img src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} className='h-72 w-60'/>
              </div>
          </Link>
          )}   
        </HorizontalScroll>
      </div>

      <div className='pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-2xl my-2'>TV Shows </span> 
          <Link to='/shows' className='text-xs '> <i className='fa-solid fa-angles-right'> </i> </Link> 
        </div>    
        <HorizontalScroll>
          {tvShows && tvShows.map((show, index) => 
            <Link to={`/shows/${show.id}`} key={index}>
              <div className='w-60 mr-2'>
                <img src={`https://image.tmdb.org/t/p/original${show?show.poster_path:""}`} className='h-72 w-60'/>
              </div>
            </Link>
          )}   
        </HorizontalScroll>
      </div>

      <div className='my-20 pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-2xl my-2'>Movies </span> 
          <Link to='/movies' className='text-xs '> <i className='fa-solid fa-angles-right'> </i> </Link> 
        </div>   
        <HorizontalScroll>
          {movies && movies.map((movie, index) => 
            <Link to={`/movies/${movie.id}`} key={index}>
              <div className='w-60 mr-2'>
                <img src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} className='h-72 w-60'/>
              </div>
          </Link>
          )}   
        </HorizontalScroll>
      </div>

      <div className='my-20 pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-2xl my-2'>Historical Movies </span> 
          <Link to='/movies' className='text-xs '> <i className='fa-solid fa-angles-right'> </i> </Link> 
        </div>   
        <HorizontalScroll>
          {historicalMovies && historicalMovies.map((movie, index) => 
            <Link to={`/movies/${movie.id}`} key={index}>
              <div className='w-60 mr-2'>
                <img src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} className='h-72 w-60'/>
              </div>
          </Link>
          )}   
        </HorizontalScroll>
      </div>
      <div className='my-20 pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-2xl my-2'>K-drama web series </span> 
          <Link to='/movies' className='text-xs '> <i className='fa-solid fa-angles-right'> </i> </Link> 
        </div>   
        <HorizontalScroll>
          {koreanDrama && koreanDrama.map((movie, index) => 
            <Link to={`/shows/${movie.id}`} key={index}>
              <div className='w-60 mr-2'>
                <img src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} className='h-72 w-60'/>
              </div>
          </Link>
          )}   
        </HorizontalScroll>
      </div>

    </div>
  )
}

export default Home;
