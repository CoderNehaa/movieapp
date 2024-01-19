import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// React Responsive Carousel
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import RatingCircle from '../components/RatingCircle';
import { dataSelector, setVideoURL } from '../redux/reducers/dataReducer';

const CarouselSlider = () => {
    const movies = useSelector(dataSelector).movies;
    const [videoId, setVideoId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if(videoId !== 0){
            fetch(`https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=a85f0e9195796914174fd0bde91a48bc`)
            .then(res => res.json())
            .then(temp => {
                if(!temp.results.length){
                    console.log('Trailer is not available right now.');
                    return;
                }
                const trailer = temp.results.filter((element) => element.name.includes('Trailer'));
                const url = trailer[0].key
                dispatch(setVideoURL(url));
            })
            .catch(err => console.log(err))
        }
    }, [videoId])

    return (
        <div>
            <Carousel showArrows={true} showThumbs={false} showStatus={false}>
                {movies && movies.map((obj, index) =>
                    <div key={index}> 
                        <div className='absolute h-full w-[800px]
                                        flex flex-col
                                        p-28 text-white font-bold text-left 
                                        bg-gradient-to-r from-black'> 
                            
                            <span className='text-5xl my-7'> {obj.original_title} </span>

                            <p className='text-2xl text-gray-500 line-clamp-3'> {obj.overview} </p>

                            <div className='flex items-center my-8'>
                                <RatingCircle value={obj.vote_average.toFixed(1)}/>

                                <button className='h-16 w-16 bg-zinc-600 rounded-full flex justify-center items-center mr-3 ml-5 
                                    hover:bg-white hover:text-black hover:backdrop:add'> 
                                    <i className='fa-solid fa-heart text-2xl'></i> 
                                </button>

                                <Link to={`/movies/${obj.id}`} className='h-16 w-16 bg-zinc-600 rounded-full flex justify-center items-center mr-3 
                                    hover:bg-white hover:text-black'> 
                                    <i className='fa-solid fa-info text-2xl'></i> 
                                </Link>
                                
                                <button className='h-16 w-16 bg-zinc-600 rounded-full flex justify-center items-center mr-3 
                                    hover:bg-white hover:text-black' onClick={() => setVideoId(obj.id)}> 
                                    <i className='fa-solid fa-play text-2xl'></i> 
                                </button>

                                <span className='text-2xl ml-2 font-semibold'> Watch Trailer </span>
                            </div>

                        </div>
                        <img src={`https://image.tmdb.org/t/p/original${obj?obj.backdrop_path:""}`} className='w-full' style={{height:"80vh"}} />
                    </div>
                )}
            </Carousel> 
        </div>
    )
}

export default CarouselSlider;
