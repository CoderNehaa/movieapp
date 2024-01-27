import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, fetchList, setMovieGenre } from '../redux/reducers/dataReducer';

import Card from '../cards/Card';
import VideoPopup from '../components/VideoPopup';
import CardSkeleton from '../loading-skeleton/CardSkeleton';

const Movies = () => {
  const { movies, genres, apiData, movieGenre, loading } = useSelector(dataSelector);
  const { baseUrl, apiKey } = apiData;
  
  const [showGenreBtn, setShowGenreBtn] =  useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => { //run only when page mount
    window.addEventListener('scroll', handleScroll);
    dispatch(fetchList({url:`${baseUrl}genre/movie/list?language=en&api_key=${apiKey}`, type:'genres'})); // Fetching genre
  }, [])

  useEffect(() => {
    if(movieGenre){
      dispatch(fetchList({type:'movies', url:`${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${movieGenre.id}&page=${page}`}))
    } else {
      dispatch(fetchList({url:`${baseUrl}movie/popular?api_key=${apiKey}&page=${page}`, type:'movies'}));
    }
    setShowGenreBtn(false);
  }, [movieGenre, page]);

  function handleScroll(){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight - 10 && !loading){
      setPage((prev) => prev+1);
    }
  }

  return (
    <div className='relative top-16 text-white min-h-screen px-2 lg:px-36 py-2 
      bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-900'>
      <div className='flex flex-wrap justify-between items-center my-5'>
        <div className='flex items-center'>
          <span to='/movies' className='text-gray-500 text-lg lg:text-xl mr-1 lg:mr-3 hover:cursor-pointer' 
            onClick={() => {dispatch(setMovieGenre(null)); setPage(1)}}> 
            Movies <i className='fa-solid fa-angles-right'></i> 
          </span>
          <span className='text-2xl lg:text-4xl font-bold ml-2'>{`${movieGenre?movieGenre.name:'All movies'}`} </span>
        </div>

          {/* Filter movies according to genre */}
          <div className='relative mx-2 text-slate-500 text-center'> 
            <div className='px-2 py-1 bg-slate-950 w-full hover:cursor-pointer text-xs md:text-sm' 
              onClick={() => setShowGenreBtn(!showGenreBtn)}> Genres <i className='fa-solid fa-chevron-down ml-1'> </i>
            </div>

              {/* Render list of genres */}
              <div className={`${showGenreBtn?"block":"hidden"} bg-slate-800 px-2 absolute w-full z-10`}>
              {genres && genres.map((genre, index) => {
                return(
                  <div className='flex justify-center hover:bg-sky-300 hover:cursor-pointer m-1 text-xs md:text-sm' key={index} 
                    onClick={() => dispatch(setMovieGenre(genre))}> {genre.name} </div>
                )
              })}

          </div>
            
        </div>
      </div>

      <div className='flex flex-wrap justify-evenly lg:justify-between'>
        { loading && <CardSkeleton count={page * 20} />}
        { movies && movies.map((obj, index) => <Card item={obj} key={index} mediaType='movies'/>)}
      </div>
      <VideoPopup />
    </div>
  )
}

export default Movies;
