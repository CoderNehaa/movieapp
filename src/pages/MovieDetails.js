import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RatingCircle from '../components/RatingCircle';
import VideoCard from '../cards/VideoCard';
import HorizontalScroll from '../carousel/HorizontalScroll';

import { dataSelector, fetchCurrent, findTrailer } from '../redux/reducers/dataReducer';
import { addToFavorites, removeFromFavorites, userSelector } from '../redux/reducers/userReducer';
import DetailsSkeleton from '../loading-skeleton/DetailsSkeleton';
import { toast } from 'react-toastify';

const MovieDetails = () => {
    const id = useParams();
    const dispatch = useDispatch();
    const {user, favorites} = useSelector(userSelector);
    const {apiData, currentMovie, loading} = useSelector(dataSelector);
    const {baseUrl, apiKey} = apiData;
    const navigate = useNavigate();

    useEffect(() => {
        const obj = {
            url:`${baseUrl}movie/${id.id}?api_key=${apiKey}&append_to_response=videos,similar`,
            type:'movie'            
        }
        dispatch(fetchCurrent(obj))
    }, [id.id])

    const date = new Date(currentMovie && currentMovie.release_date);
    const rating = currentMovie && (currentMovie.vote_average).toFixed(1);
    
    const backgroundImageStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.backdrop_path : ''})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
    
    const isFav = () => {
        const ans = favorites && favorites.some((obj) => obj.id === currentMovie.id);
        return ans;
    }

    return (
        <>
        {loading?
            <DetailsSkeleton/>
            :currentMovie?
                <div className='min-h-screen h-full relative top-16 pb-12 bg-slate-900'>
                <div style={backgroundImageStyle} className='text-white'>
                    <div className='py-4 md:py-12 md:px-4 lg:py-16 xl:py-28 lg:px-20 xl:px-52 xl:min-h-screen h-full w-full
                        flex flex-col items-center md:flex-row md:items-start bg-slate-900 opacity-90'>
                    <img src={currentMovie.poster_path
                                                ?`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
                                                :`https://i.etsystatic.com/35096161/r/il/e50732/4588726794/il_fullxfull.4588726794_3qe7.jpg`
                            } 
                            className='h-[500px] w-[350px] lg:w-[480px] lg:h-[600px] rounded-lg'/>

                        <div className='flex flex-col px-4 md:px-8 lg:pl-20 text-xl'>
                            <span className='text-2xl lg:text-5xl my-4'>
                                {`${currentMovie.original_title} (${date.getFullYear()})`} 
                            </span>
                            <div> {currentMovie.genres.map((item, index) => 
                                <span className='mr-4 py-1 px-2 text-sm bg-pink-800 font-semibold rounded-md' key={index}> {item.name} </span>
                            )}</div>
                            
                            <span className='text-slate-400 italic text-xl my-4'> {currentMovie.tagline} </span>
            
                            <div className='flex justify-start items-center my-5'>
                                
                                <div className='h-20 w-20'><RatingCircle value={rating} /></div>

                                <button className='h-16 w-16 bg-white text-black rounded-full mx-5' 
                                    onClick={() => {user?
                                        isFav()?dispatch(removeFromFavorites(currentMovie)):dispatch(addToFavorites(currentMovie))
                                                    :toast.warn('Sign in to add to your favorites list')}}> 
                                    <i className={`fa-solid 
                                        ${user?isFav()?'fa-heart-circle-minus':'fa-heart-circle-plus':'fa-heart'} text-3xl`}> </i>
                                </button>

                                <button onClick={() => {dispatch(findTrailer({id:currentMovie.id, type:'movie'})); navigate('/watch')}} 
                                    className='flex items-center'>
                                    <div className='h-16 w-16 bg-white text-black rounded-full flex justify-center items-center'> 
                                        <i className="fa-solid fa-play text-3xl"></i> 
                                    </div>
                                    <span className='ml-5 text-sm lg:text-lg'> Watch Trailer </span>
                                </button>
                            </div>
            

                            <div className='flex justify-evenly m-2 border-b-2 border-gray-500 p-2 text-sm lg:text-lg'>
                                <span> Budget : <span className='text-gray-400'> ${currentMovie.budget}</span> </span>
                                <span> Revenue :<span className='text-gray-400'> ${currentMovie.revenue}</span> </span>
                                <span> Duration :<span className='text-gray-400'>  {currentMovie.runtime} min </span> </span>
                            </div>
                            
                            <div className='flex justify-evenly m-2 border-b-2 border-gray-500 p-2 text-sm lg:text-lg'>
                                <span> Status : <span className='text-gray-400'> {currentMovie.status}</span> </span>
                                <span> Release Date : <span className='text-gray-400'> {currentMovie.release_date} </span></span>
                            </div>
                            <p className='text-sm lg:text-xl py-5 tracking-wide text-justify font-light line'> 
                                {currentMovie.overview} 
                            </p>
                        </div>
                    </div>
                </div>

                {/* Official videos of this movie */}
                {currentMovie.videos.results.length
                    ?<div className='h-full text-white lg:py-12 xl:px-52'>
                        <h1 className='text-xl md:text-2xl lg:text-3xl tracking-wide px-4 py-4'> Official videos </h1>
                        <div className='px-4'>
                        {currentMovie.videos.results.length>4
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
                    </div>
                    :null}

                    {/* Similar movies to recommend */}
                    {currentMovie.similar.results.length
                        ?<div className='h-full text-white lg:py-12 xl:px-52'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl tracking-wide my-4 px-4'> Similar Movies </h1>
                            <div className='px-4'>
                            {currentMovie.similar.results.length>5
                                ?<HorizontalScroll>
                                    {currentMovie.similar.results.map((obj, index) => (
                                    <Link to={`/movies/${obj.id}`} key={index}>
                                        <div className='w-28 md:w-40 lg:w-56 mr-4'>
                                            <img src={obj.poster_path
                                                ?`https://image.tmdb.org/t/p/original${obj.poster_path}`
                                                :`https://i.etsystatic.com/35096161/r/il/e50732/4588726794/il_fullxfull.4588726794_3qe7.jpg`} 
                                                className='h-36 w-28 md:h-48 md:w-40 lg:h-72 lg:w-56'
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
                        </div>
                        :null
                    }
                </div>
                :null
            }
        </>
    )
}

export default MovieDetails;
