import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import SeasonCard from '../cards/SeasonCard';
import RatingCircle from '../components/RatingCircle';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, fetchCurrent, findTrailer} from "../redux/reducers/dataReducer";
import { addToFavorites } from '../redux/reducers/userReducer';
import DetailsSkeleton from "../loading-skeleton/DetailsSkeleton";

const ShowDetails = () => {
    const {id} = useParams();
    const {currentShow, loading} = useSelector(dataSelector)
    const [showNextEpisode, setShowNextEpisode ] = useState(false);
    const {baseUrl, apiKey} = useSelector(dataSelector).apiData;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrent({ url:`${baseUrl}tv/${id}?api_key=${apiKey}&append_to_response=videos`, type:'show' }));
    }, [id])

    const backgroundImageStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentShow ? currentShow.backdrop_path : ''})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };

    const date = new Date(currentShow && currentShow.first_air_date);
    let rating = currentShow && (currentShow.vote_average).toFixed(1);

    return (
        <>
        {loading?
        <DetailsSkeleton/>
        :currentShow?
        <div className='min-h-screen h-full relative top-16 bg-slate-900'>
                <div style={backgroundImageStyle} className='text-white'>
                    <div className='py-8 md:px-4 lg:py-16 lg:px-20 xl:px-52 opacity-95
                        flex flex-col items-center md:flex-row md:items-start xl:min-h-screen w-full
                        bg-gradient-to-b from-slate-900 to-slate-950'>

                        <img src={`https://image.tmdb.org/t/p/original${currentShow?currentShow.poster_path:""}`} 
                            className='h-[500px] w-[350px] lg:w-[450px] lg:h-[550px] rounded-lg'/>

                        <div className='flex flex-col px-4 md:px-8 lg:pl-20 text-xl'>
                            <span className='text-2xl lg:text-5xl my-4'> {`${currentShow.original_name} (${date.getFullYear()})`} </span>
                            <div> {currentShow.genres.map((item, index) => 
                                <span className='mr-4 py-1 px-2 text-sm bg-pink-800 font-semibold rounded-md' key={index}> {item.name} </span>
                            )}</div>
                            <span className='text-slate-400 italic text-xl my-4'> {currentShow.tagline} </span>
                            
                            <div className='flex justify-start items-center my-5'>
                                <RatingCircle value={rating} />
                                <button className='h-16 w-16 bg-white text-black rounded-full mx-5' 
                                    onClick={() => dispatch(addToFavorites(currentShow))}> 
                                    <i className='fa-solid fa-heart text-3xl'> </i>
                                </button>
                                <button onClick={() => dispatch(findTrailer({type:'tv', id:currentShow.id}))} className='flex items-center'>
                                    <div className='h-16 w-16 bg-white text-black rounded-full flex justify-center items-center'> 
                                        <i className="fa-solid fa-play text-3xl"></i> 
                                    </div>
                                    <span className='ml-5 text-sm lg:text-xl'> Watch Trailer </span>
                                </button>
                            </div>
                            
                            {currentShow.created_by.length?<div className='flex flex-wrap'>
                                <span> Creator :  &nbsp;</span>
                                {currentShow && currentShow.created_by.map((creator, index) => (
                                    <div key={index}>
                                    <span>{`${creator.name}`}, &nbsp; </span> 
                                    </div>
                                ))}
                            </div>:null}

                            <p className='text-lg my-5 tracking-wide text-justify font-light line'> {currentShow.overview} </p> 
                            
                            {currentShow.next_episode_to_air && currentShow.next_episode_to_air.overview !== ""
                                ?<div className='flex items-start'>
                                    <button className='bg-red-400 px-4 py-2 rounded-lg min-w-72' 
                                        onClick={() => setShowNextEpisode(!showNextEpisode)}> {`In the next episode >>> `} </button>
                                    <p className={showNextEpisode?'ml-4':'hidden'}> 
                                        In the next episode, {currentShow.next_episode_to_air.overview} </p>  
                                </div>
                                :null
                            }

                        </div>
                    </div>
                </div>
                <div className='lg:px-20 xl:px-52 py-10 text-slate-300'>
                    <span className='my-4 text-xl lg:text-3xl px-4'> All seasons </span>
                    <div className='flex flex-wrap'>
                        {currentShow.seasons.map((season, index) => <SeasonCard key={index} series={currentShow.original_name} obj={season} />)}
                    </div>
                </div>
            </div>
            :null
        }
        </>
    )
}

export default ShowDetails;
