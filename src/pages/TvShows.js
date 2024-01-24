import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../cards/Card';
import { dataSelector, fetchList, setTVgenre, setLoading } from '../redux/reducers/dataReducer';

const TvShows = () => {
  const { tvShows, genres, apiData, tvGenre, loading } = useSelector(dataSelector);
  const { baseUrl, apiKey } = apiData;
  const [ showGenreBtn, setShowGenreBtn ] =  useState(false);
  const [ page, setPage ] = useState(1);
  const dispatch = useDispatch();
  
  useEffect(() => { //run only when page mounted
    window.addEventListener('scroll', handleScroll);
    dispatch(fetchList({url:`${baseUrl}genre/tv/list?language=en&api_key=${apiKey}`, type:'genres'})); // Fetching genre
  }, [])

  useEffect(() => {
    if(tvGenre){
      dispatch(setLoading(true));
      dispatch(fetchList({type:'shows', url:`${baseUrl}discover/tv?api_key=${apiKey}&with_genres=${tvGenre.id}&page=${page}`}))
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(true));
      dispatch(fetchList({url:`${baseUrl}tv/popular?api_key=${apiKey}&page=${page}`, type:'shows'}));
      dispatch(setLoading(false));
    }
    setShowGenreBtn(false);
  }, [tvGenre, page]);

  function handleScroll(){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight - 10 && !loading){
      setPage((prev) => prev+1);
    }
  }

  return (
    <div className='relative top-16 bg-slate-900 text-white min-h-screen px-36 py-2'>
      <div className='flex flex-wrap justify-between items-center my-5'>
        <div className='flex items-center'>
          <span className='text-gray-500 text-xl mr-3 hover:cursor-pointer' 
            onClick={() => {dispatch(setTVgenre(null)); setPage(1)}}> 
            TV Shows <i className='fa-solid fa-angles-right'></i> 
          </span>
          <span className='text-4xl font-bold ml-2'>{`${tvGenre?tvGenre.name:'All Shows'}`} </span>
        </div>

        {/* Filter movies according to genre */}
        <div className='relative mx-2 text-slate-500 text-center'> 
          <div className='px-2 py-1 bg-slate-950 w-full hover:cursor-pointer' 
            onClick={() => setShowGenreBtn(!showGenreBtn)}> 
            Genres <i className='fa-solid fa-chevron-down ml-1'> </i>
          </div>

          {/* Render list of genres */}
          <div className={`${showGenreBtn?"block":"hidden"} bg-slate-800 px-2 absolute w-full`}>
            {genres && genres.map((genre, index) => {
              return(
                <div className='flex justify-center hover:bg-sky-300 hover:cursor-pointer m-1 text-sm' key={index} 
                  onClick={() => dispatch(setTVgenre(genre))}> {genre.name} </div>
              )
            })}
          </div>
            
        </div>

      </div>

      <div className='flex flex-wrap justify-between'>
      { tvShows && tvShows.map((obj, index) => <Card item={obj} key={index} mediaType='shows'/>)}
      </div>
    </div>
  )
}

export default TvShows;
