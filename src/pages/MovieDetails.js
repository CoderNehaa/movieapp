import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HorizontalScroll from '../carousel/HorizontalScroll';
import VideoCard from '../cards/VideoCard';
import { dataSelector, fetchCurrent, setVideoURL } from '../redux/reducers/dataReducer';
import RatingCircle from '../components/RatingCircle';

const MovieDetails = () => {
    const id = useParams();
    const dispatch = useDispatch();
    const {apiData, currentMovie} = useSelector(dataSelector);
    const {baseUrl, apiKey} = apiData;

    useEffect(() => {
        const obj = {
            url:`${baseUrl}movie/${id.id}?api_key=${apiKey}&append_to_response=videos,similar`,
            type:'movie'            
        }
        dispatch(fetchCurrent(obj))
        }, [id.id])

    function findTrailer(){
        if(currentMovie && currentMovie.videos.results.length){
            const arr = currentMovie.videos.results.filter((obj) => obj.name.includes('Trailer'));
            const url= arr[0].key;
            dispatch(setVideoURL(url));
        }
    }

    const date = new Date(currentMovie && currentMovie.release_date);
    const rating = currentMovie && (currentMovie.vote_average).toFixed(1);
    
    const backgroundImageStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.backdrop_path : ''})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
    
    return (
        <>
        <div style={backgroundImageStyle} className='text-white'>
            <div className='relative top-16 py-8 md:px-4 lg:py-16 lg:px-20 xl:px-52 flex flex-col items-center md:flex-row md:items-start min-h-screen w-full bg-slate-900 opacity-90'>
            <img src={currentMovie && currentMovie.poster_path
                                        ?`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
                                        :`https://i.etsystatic.com/35096161/r/il/e50732/4588726794/il_fullxfull.4588726794_3qe7.jpg`
                    } 
                    className='h-[500px] w-[350px] lg:w-[480px] lg:h-[600px] rounded-lg'/>
                <div className='flex flex-col px-4 md:px-8 lg:pl-20 text-xl'>
                    <span className='text-2xl lg:text-5xl my-4'>
                         {`${currentMovie && currentMovie.original_title} (${date.getFullYear()})`} </span>
                    <div> {currentMovie && currentMovie.genres.map((item, index) => <span className='mr-4 py-1 px-2 text-sm bg-pink-800 font-semibold rounded-md' key={index}> {item.name} </span>)}</div>
                    <span className='text-slate-400 italic text-xl my-4'> {currentMovie && currentMovie.tagline} </span>
                    
                    <div className='flex items-center my-5'>
                        <RatingCircle value={rating} />
                        <div className='mx-8 text-6xl p-1 border-2 rounded-full'>
                            <button onClick={findTrailer}> <i className="fa-solid fa-circle-play"></i> </button>
                        </div>
                        <span> Watch Trailer </span>
                    </div>

                    <div className='flex justify-evenly m-2 border-b-2 border-gray-500 p-2 text-base'>
                        <span> Budget : <span className='text-gray-400'> ${currentMovie && currentMovie.budget}</span> </span>
                        <span> Revenue :<span className='text-gray-400'> ${currentMovie && currentMovie.revenue}</span> </span>
                        <span> Duration :<span className='text-gray-400'>  {currentMovie && currentMovie.runtime} min </span> </span>
                    </div>
                    
                    <div className='flex justify-evenly m-2 border-b-2 border-gray-500 p-2 text-base'>
                        <span> Status : <span className='text-gray-400'> {currentMovie && currentMovie.status}</span> </span>
                        <span> Release Date : <span className='text-gray-400'> {currentMovie && currentMovie.release_date} </span></span>
                    </div>
                    <p className='text-md my-5 tracking-wide text-justify font-light line'> {currentMovie && currentMovie.overview} </p>
                </div>
            </div>
        </div>

        {/* Official videos of this movie */}
        {currentMovie && currentMovie.videos.results.length
            ?<div className='h-full bg-slate-900 text-white py-12 lg:px-52'>
                <h1 className='text-xl lg:text-3xl tracking-wide my-4'> Official videos </h1>
                {currentMovie.videos.results.length>3
                    ?<HorizontalScroll>
                        {currentMovie.videos.results.map((video, index) => (
                            <VideoCard video={video} key={index} />
                        ))}
                    </HorizontalScroll>
                    :<div className='flex'>
                        {currentMovie.videos.results.map((video, index) => (
                            <VideoCard video={video} key={index} />
                        ))}
                    </div>
                }
            </div>
            :null}

            {/* Similar movies to recommend */}
            {currentMovie && currentMovie.similar.results.length
                ?<div className='h-full bg-slate-900 text-white py-12 lg:px-52'>
                    <h1 className='text-xl lg:text-3xl tracking-wide my-4'> Similar Movies </h1>
                    {currentMovie.similar.results.length>3
                        ?<HorizontalScroll>
                            {currentMovie.similar.results.map((obj, index) => (
                               <Link to={`/movies/${obj.id}`} key={index}>
                                <div className='w-56 mr-4'>
                                    <img src={obj.poster_path
                                        ?`https://image.tmdb.org/t/p/original${obj.poster_path}`
                                        :`https://i.etsystatic.com/35096161/r/il/e50732/4588726794/il_fullxfull.4588726794_3qe7.jpg`} 
                                        className='h-72 w-56'
                                    />
                                </div>
                           </Link>
                        ))}
                        </HorizontalScroll>
                        :<div>
                            {currentMovie.similar.results.map((obj, index) => (
                                <Link to={`/movies/${obj.id}`} key={index}>
                                    <div className='w-56 mr-4'>
                                        <img src={`https://image.tmdb.org/t/p/original${obj?obj.poster_path:"https://i.etsystatic.com/35096161/r/il/e50732/4588726794/il_fullxfull.4588726794_3qe7.jpg"}`} className='h-72 w-56'/>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    }
                </div>
                :null
            }


        </>

    )
}

export default MovieDetails;
