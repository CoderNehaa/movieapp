import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// React Responsive Carousel
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import RatingCircle from '../components/RatingCircle';
import { dataSelector, fetchList, findTrailer } from '../redux/reducers/dataReducer';
import { addToFavorites, removeFromFavorites, userSelector } from '../redux/reducers/userReducer';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';

const CarouselSlider = () => {
    const { user, favorites } = useSelector(userSelector);
    const { movies, loading, apiData } = useSelector(dataSelector);
    const {baseUrl, apiKey} = apiData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchList({type:'movie', url:`${baseUrl}movie/popular?api_key=${apiKey}`}));
    }, []);
    
    const isFav = (item) => {
        const ans = favorites && favorites.some((obj) => obj.id === item.id);
        return ans;
    }

    return (
        <div>
            <Carousel showArrows={true} autoPlay={true} showThumbs={false} showStatus={false} showIndicators={false}>
                {movies && movies.map((obj, index) =>
                    <div key={index}> 
                        <div className='absolute h-full w-full lg:w-[800px] py-6 px-8 md:px-12 lg:p-28 text-white font-bold text-left
                                        flex flex-col items-start justify-evenly bg-gradient-to-r from-black'> 
                            <span className='text-xl md:text-3xl lg:text-5xl'> {obj.original_title} </span>
                            <div> <p className='text-sm md:text-xl lg:text-2xl text-gray-300 line-clamp-4 my-1 lg:my-8'> 
                                {obj.overview} </p> </div>
                            
                            <div className='flex flex-wrap items-center'>
                               <div className='h-12 w-12 lg:h-20 lg:w-20'> <RatingCircle value={obj.vote_average.toFixed(1)}/></div>

                                <button className='h-10 w-10 lg:h-16 lg:w-16 mr-3 ml-5 flex justify-center items-center
                                    bg-zinc-600 rounded-full hover:bg-white hover:text-black' 
                                    onClick={() => user
                                                    ?isFav(obj)?dispatch(removeFromFavorites(obj)):dispatch(addToFavorites(obj))
                                                    :toast.warn('Signin to add to your favorite list.')}> 
                                    <i className={`fa-solid ${user?isFav(obj)?'fa-heart-circle-minus':'fa-heart-circle-plus':'fa-heart'} text-xl lg:text-3xl`}></i> 
                                </button>

                                <Link to={`/movies/${obj.id}`} className='h-10 w-10 lg:h-16 lg:w-16 bg-zinc-600 rounded-full flex justify-center items-center mr-3 
                                    hover:bg-white hover:text-black'> 
                                    <i className='fa-solid fa-info text-xl lg:text-3xl'></i> 
                                </Link>
                                 
                                <button className='h-10 w-10 lg:h-16 lg:w-16 bg-zinc-600 rounded-full flex justify-center items-center mr-3 
                                    hover:bg-white hover:text-black' 
                                    onClick={() => {dispatch(findTrailer({id:obj.id, type:'movie'})); navigate('/watch')}}> 
                                    <i className='fa-solid fa-play text-xl lg:text-3xl'></i> 
                                </button>
                                <span className='text-2xl ml-2 font-semibold hidden lg:flex'> Watch Trailer </span>
                            </div>

                        </div>

                        {loading
                            ?<div className='sliderImg'> <Skeleton height={"100%"} width={"100%"} /> </div>
                            :<img src={`https://image.tmdb.org/t/p/original${obj?obj.backdrop_path:""}`} 
                                className='w-full sliderImg'/>
                        }
                    
                    </div>
                )}
            </Carousel> 
        </div>
    )
}

export default CarouselSlider;
