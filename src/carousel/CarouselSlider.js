import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// React Responsive Carousel
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import RatingCircle from '../components/RatingCircle';
import { dataSelector, findTrailer } from '../redux/reducers/dataReducer';
import { addToFavorites, getFavorites, userSelector } from '../redux/reducers/userReducer';

const CarouselSlider = () => {
    const {user} = useSelector(userSelector);
    const {movies} = useSelector(dataSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getFavorites());
    }, []);

    return (
        <div>
            <Carousel showArrows={true} autoPlay={true} showThumbs={false} showStatus={false} showIndicators={false}>
                {movies && movies.map((obj, index) =>
                    <div key={index}> 
                        <div className='absolute h-full lg:w-[800px] p-10 lg:p-28 text-white font-bold text-left
                                        flex flex-col flex-wrap justify-center items-start bg-gradient-to-r from-black'> 
                            <span className='text-3xl lg:text-5xl'> {obj.original_title} </span>
                            
                            <div>
                                <p className='text-xl lg:text-2xl text-gray-300 line-clamp-4 my-8'> {obj.overview} </p>
                            </div>
                            
                            <div className='flex flex-wrap items-center'>
                                <RatingCircle value={obj.vote_average.toFixed(1)}/>

                                <button className='h-12 w-12 lg:h-16 lg:w-16 mr-3 ml-5 flex justify-center items-center
                                    bg-zinc-600 rounded-full hover:bg-white hover:text-black' 
                                    onClick={() => user?dispatch(addToFavorites(obj)):navigate('signin')}> 
                                    <i className='fa-solid fa-heart text-2xl'></i> 
                                </button>

                                <Link to={`/movies/${obj.id}`} className='h-12 w-12 lg:h-16 lg:w-16 bg-zinc-600 rounded-full flex justify-center items-center mr-3 
                                    hover:bg-white hover:text-black'> 
                                    <i className='fa-solid fa-info text-2xl'></i> 
                                </Link>
                                 
                                <button className='h-12 w-12 lg:h-16 lg:w-16 bg-zinc-600 rounded-full flex justify-center items-center mr-3 
                                    hover:bg-white hover:text-black' onClick={() => dispatch(findTrailer({id:obj.id, type:'movie'}))}> 
                                    <i className='fa-solid fa-play text-2xl'></i> 
                                </button>
                                <span className='text-2xl ml-2 font-semibold hidden lg:flex'> Watch Trailer </span>
                            </div>

                        </div>
                        <img src={`https://image.tmdb.org/t/p/original${obj?obj.backdrop_path:""}`} 
                            className='w-full' id='sliderImg' />
                    </div>
                )}
            </Carousel> 
        </div>
    )
}

export default CarouselSlider;
