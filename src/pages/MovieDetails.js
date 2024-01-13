import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import HorizontalScroll from '../components/carousel/HorizontalScroll';
import VideoCard from '../cards/VideoCard';
import { setVideoURL } from '../redux/dataReducer';
import RatingCircle from '../components/RatingCircle';

const MovieDetails = () => {
    const id = useParams();
    const dispatch = useDispatch();
    const [ movie, setMovie ] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id.id}?api_key=a85f0e9195796914174fd0bde91a48bc&append_to_response=videos`)
        .then(res => res.json())
        .then(data => setMovie(data))
        .catch(err => console.log("Error while fetching the selected movie details.", err))
    }, [id.id])

    function findTrailer(){
        if(movie && movie.videos.results.length){
            const arr = movie.videos.results.filter((obj) => obj.name.includes('Trailer'));
            const url= arr[0].key;
            dispatch(setVideoURL(url));
        }
    }

    const date = new Date(movie && movie.release_date);
    const rating = movie && (movie.vote_average).toFixed(1);
    
    const backgroundImageStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie ? movie.backdrop_path : ''})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
    
    return (
        <>
        <div style={backgroundImageStyle} className='text-white'>
            <div className='relative top-16 py-8 md:px-4 lg:py-16 lg:px-20 xl:px-52 flex flex-col items-center md:flex-row md:items-start min-h-screen w-full bg-slate-900 opacity-90'>
                <img src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} 
                    className='h-[500px] w-[350px] lg:w-[480px] lg:h-[600px] rounded-lg'/>
                <div className='flex flex-col px-4 md:px-8 lg:pl-20 text-xl'>
                    <span className='text-2xl lg:text-5xl my-4'> {`${movie && movie.original_title} (${date.getFullYear()})`} </span>
                    <div> {movie && movie.genres.map((item, index) => <span className='mr-4 py-1 px-2 text-sm bg-pink-800 font-semibold rounded-md' key={index}> {item.name} </span>)}</div>
                    <span className='text-slate-400 italic text-xl my-4'> {movie && movie.tagline} </span>
                    
                    <div className='flex items-center my-5'>
                        <RatingCircle value={rating} />
                        <div className='mx-8 text-6xl p-1 border-2 rounded-full'>
                            <button onClick={findTrailer}> <i className="fa-solid fa-circle-play"></i> </button>
                        </div>
                        <span> Watch Trailer </span>
                    </div>

                    <div className='flex justify-evenly m-2 border-b-2 border-gray-500 p-2 text-base'>
                        <span> Budget : <span className='text-gray-400'> ${movie && movie.budget}</span> </span>
                        <span> Revenue :<span className='text-gray-400'> ${movie && movie.revenue}</span> </span>
                        <span> Duration :<span className='text-gray-400'>  {movie && movie.runtime} min </span> </span>
                    </div>
                    <div className='flex justify-evenly m-2 border-b-2 border-gray-500 p-2 text-base'>
                        <span> Status : <span className='text-gray-400'> {movie && movie.status}</span> </span>
                        <span> Release Date : <span className='text-gray-400'> {movie && movie.release_date} </span></span>
                    </div>
                    <p className='text-md my-5 tracking-wide text-justify font-light line'> {movie && movie.overview} </p>
                </div>
            </div>
        </div>
        {movie && movie.videos.results.length
            ?<div className='h-full bg-slate-900 text-white py-16 lg:px-52'>
                <h1 className='text-xl lg:text-3xl tracking-wide m-4'> Official videos </h1>
                <HorizontalScroll>
                    {movie && movie.videos.results.map((video, index) => (
                        <VideoCard video={video} key={index} />
                    ))}
                </HorizontalScroll>
            </div>
            :null}
        </>

    )
}

export default MovieDetails;
