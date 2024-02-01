import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, emptyMovies, fetchGenres, fetchList, setMovieGenre } from '../redux/reducers/dataReducer';

import Card from '../cards/Card';
import CardSkeleton from '../loading-skeleton/CardSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderSpinner from "../loading-skeleton/LoaderSpinner";
import { getFavorites } from '../redux/reducers/userReducer';

const Movies = () => {
  const { movies, movieGenresList, apiData, movieGenre, loading } = useSelector(dataSelector);
  const { baseUrl, apiKey } = apiData;
  
  const [showGenreBtn, setShowGenreBtn] =  useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => { //run only when page mount
    dispatch(getFavorites());
    dispatch(fetchGenres('movie'));
  }, []);

  useEffect(() => {
    if(movieGenre){
      dispatch(fetchList({type:'movie', url:`${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${movieGenre.id}&page=${page}`}))
    } else {
        if(page===1){
          dispatch(emptyMovies());
        }
      dispatch(fetchList({url:`${baseUrl}movie/popular?api_key=${apiKey}&page=${page}`, type:'movie'}));
    }
    setShowGenreBtn(false);
  }, [page, movieGenre]);

  function showAllMovies(){
    setPage(1);
    if(movieGenre!==null){
      dispatch(setMovieGenre(null));
    }
  }

  return (
    <div className='relative top-16 text-white min-h-screen px-2 lg:px-36 py-2 
      bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-900'>
      <div className='flex flex-wrap justify-between items-center my-5'>
        <div className='flex items-center'>
          <span className='text-gray-500 text-lg lg:text-xl mr-1 lg:mr-3 hover:cursor-pointer' 
            onClick={showAllMovies}> Movies <i className='fa-solid fa-angles-right'></i> </span>
          <span className='text-2xl lg:text-4xl font-bold ml-2'>{`${movieGenre?movieGenre.name:'All movies'}`} </span>
        </div>

          {/* Filter movies according to genre */}
          <div className='relative mx-2 text-slate-500 text-center'> 
            <div className='px-2 py-1 bg-slate-950 w-full hover:cursor-pointer text-xs md:text-sm' 
              onClick={() => setShowGenreBtn(!showGenreBtn)}> Genres <i className='fa-solid fa-chevron-down ml-1'> </i>
            </div>

              {/* Render list of genres */}
              <div className={`${showGenreBtn?"block":"hidden"} bg-slate-800 px-2 absolute w-full z-10`}>
              {movieGenresList && movieGenresList.map((genre, index) => {
                return(
                  <div className='flex justify-center hover:bg-sky-300 hover:cursor-pointer m-1 text-xs md:text-sm' key={index} 
                    onClick={() => dispatch(setMovieGenre(genre))}> {genre.name} </div>
                )
              })}

          </div>
            
        </div>
      </div>

      <InfiniteScroll 
        dataLength={movies.length} 
        next={() => setPage(page+1)} 
        hasMore={!loading} 
        loader={<LoaderSpinner />}
        endMessage={<span className='text-4xl flex justify-center'> No more data </span>} 
        style={{overflow:'hidden'}}
      >
        <div className='flex flex-wrap justify-evenly lg:justify-between'>
          { loading && <CardSkeleton count={page * 20} />}
          { movies && movies.map((obj, index) => <Card item={obj} key={index} mediaType='movies'/>)}
        </div>
      </InfiniteScroll>
      
    </div>
  )
}

export default Movies;
