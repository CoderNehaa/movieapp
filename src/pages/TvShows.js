import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../cards/Card';
import CardSkeleton from "../loading-skeleton/CardSkeleton";
import { dataSelector, emptyShows, fetchGenres, fetchList, setTVgenre } from '../redux/reducers/dataReducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFavorites, userSelector } from '../redux/reducers/userReducer';
import LoaderSpinner from '../loading-skeleton/LoaderSpinner';

const TvShows = () => {
  const { tvShows, tvGenresList, apiData, tvGenre, loading } = useSelector(dataSelector);
  const { baseUrl, apiKey } = apiData;
  const [ showGenreBtn, setShowGenreBtn ] =  useState(false);
  const [ page, setPage ] = useState(1);
  const dispatch = useDispatch();
  
  useEffect(() => { //run only when page mounted
    dispatch(getFavorites());
    dispatch(fetchGenres('tv'));
  }, [])

  useEffect(() => {
    if(tvGenre){
      dispatch(fetchList({type:'shows', url:`${baseUrl}discover/tv?api_key=${apiKey}&with_genres=${tvGenre.id}&page=${page}`}));
    } else {
      if(page === 1){
        dispatch(emptyShows());
      }
      dispatch(fetchList({url:`${baseUrl}tv/popular?api_key=${apiKey}&page=${page}`, type:'shows'}));
    }
    setShowGenreBtn(false);
  }, [tvGenre, page]);

  function showAllShows(){
    setPage(1);
    if(tvGenre!==null){
      dispatch(setTVgenre(null));
    }
  }

  return (
    <div className='relative top-16 text-white min-h-screen px-2 lg:px-36 py-2 
      bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-900'>
      <div className='flex flex-wrap justify-between items-center my-5'>
        <div className='flex items-center'>
          <span className='text-gray-500 text-lg lg:text-xl mr-1 lg:mr-3 hover:cursor-pointer' onClick={showAllShows}> 
            TV Shows <i className='fa-solid fa-angles-right'></i> </span>
          <span className='text-2xl lg:text-4xl font-bold ml-2'>{`${tvGenre?tvGenre.name:'All Shows'}`} </span>
        </div>

        {/* Filter movies according to genre */}
        <div className='relative mx-2 text-slate-500 text-center'> 
          <div className='px-2 py-1 bg-slate-950 w-full hover:cursor-pointer text-xs md:text-base' 
            onClick={() => setShowGenreBtn(!showGenreBtn)}> 
            Genres <i className='fa-solid fa-chevron-down ml-1'> </i>
          </div>

          {/* Render list of genres */}
          <div className={`${showGenreBtn?"block":"hidden"} bg-slate-800 px-2 absolute z-10 w-full`}>
            {tvGenresList && tvGenresList.map((genre, index) => {
              return(
                <div className='flex justify-center hover:bg-sky-300 hover:cursor-pointer m-1 text-xs md:text-sm' key={index} 
                  onClick={() => dispatch(setTVgenre(genre))}> {genre.name} </div>
              )
            })}
          </div>
        </div>

      </div>

      <InfiniteScroll dataLength={tvShows.length} next={() => setPage(page+1)} hasMore={!loading} loader={<LoaderSpinner />} style={{overflow:'hidden'}}>
        <div className='flex flex-wrap justify-evenly lg:justify-between'>
        {loading && <CardSkeleton count={page*20}/> }
        { tvShows && tvShows.map((obj, index) => <Card item={obj} key={index} mediaType='shows'/>)}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default TvShows;
