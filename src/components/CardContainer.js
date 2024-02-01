import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HorizontalScroll from '../carousel/HorizontalScroll';
import { useDispatch, useSelector } from 'react-redux';
import {dataSelector, findTrailer, setLoading, setMovieGenre, setTVgenre} from '../redux/reducers/dataReducer';
import { addToFavorites, removeFromFavorites, userSelector } from '../redux/reducers/userReducer';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';

const CardContainer = ({genre, media}) => {
  const { user, favorites } = useSelector(userSelector);
  const { loading, apiData } = useSelector(dataSelector);
  const {baseUrl, apiKey} = apiData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    fetch(`${baseUrl}discover/${media}?api_key=${apiKey}&with_genres=${genre.id}`)
    .then(res => res.json())
    .then(data => setList(data.results))
    .catch(err => toast.error(err.message))
    dispatch(setLoading(false));
  }, [])
  
  const isFav = (item) => {
    const ans = favorites && favorites.some((obj) => obj.id === item.id);
    return ans;
  }

  function handleNavigate(){
      media==="tv"?dispatch(setTVgenre(genre)):dispatch(setMovieGenre(genre));
      media==='tv'?navigate('/shows'):navigate('/movies');
  }

  return (
    <div className='my-3 lg:my-8 pl-2 lg:pl-10'>
        <div className='w-full flex items-center justify-between'> 
          <span className='text-base lg:text-2xl my-2'> {genre.name} {media==="movie"?" Movies":" Shows"}  </span> 
          <span className='text-xs' onClick={handleNavigate}> <i className='fa-solid fa-angles-right'> </i> </span> 
        </div>   
        <HorizontalScroll>
          {list && list.map((obj, index) => 
              <div className='mr-2 relative hover:cursor-pointer card' key={index}>
                <div>
                  <div className='h-32 w-28 md:h-48 md:w-44 lg:h-72 lg:w-60'>
                    {loading
                      ?<Skeleton height={"100%"} width={"100%"} />
                      :<img src={`https://image.tmdb.org/t/p/original${obj?obj.poster_path:""}`} className='h-full w-full'/>
                    }
                  </div>
                  <div className='absolute bottom-0 bg-gradient-to-r from-black p-2 lg:p-4 hoverStyle flex items-center invisible'>
                    <Link to={media==="movie"?`/movies/${obj.id}`:`/shows/${obj.id}`}>
                      <i className='fa-solid fa-info-circle text-2xl lg:text-5xl mx-2'> </i>
                    </Link>
                    
                    <i className='fa-solid fa-circle-play text-2xl lg:text-5xl mr-2 hover:cursor-pointer' 
                      onClick={() => {dispatch(findTrailer({id:obj.id, type:media})); navigate('/watch')}}> </i>

                    <button onClick={() => {user
                                            ?isFav(obj)?dispatch(removeFromFavorites(obj)):dispatch(addToFavorites(obj))
                                            :toast.warn('Signin to add to your favorites list.')}} 
                      className='h-6 w-6 lg:h-12 lg:w-12 text-base lg:text-2xl bg-white text-black rounded-full'> 
                      <i className={`hovEff fa-solid ${user?isFav(obj)?'fa-heart-circle-minus':'fa-heart-circle-plus':'fa-heart'}`}> </i>
                    </button>
                
                   </div>
                   
                </div>
              </div>
          )}   
        </HorizontalScroll>
      </div>
  )
}

export default CardContainer;
