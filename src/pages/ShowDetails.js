import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import SeasonCard from '../cards/SeasonCard';
import RatingCircle from '../components/RatingCircle';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, fetchCurrent} from "../redux/reducers/dataReducer";

const ShowDetails = () => {
    const id = useParams();
    const show = useSelector(dataSelector).currentShow
    const [showNextEpisode, setShowNextEpisode ] = useState(false);
    const {baseUrl, apiKey} = useSelector(dataSelector).apiData;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrent({
            url:`${baseUrl}tv/${id.id}?api_key=${apiKey}&append_to_response=videos`
        }))
    }, [])

    const backgroundImageStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${show ? show.backdrop_path : ''})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
    
    const date = new Date(show && show.first_air_date);
    let rating = show && (show.vote_average).toFixed(1);

    return (
        <>
        <div style={backgroundImageStyle} className='text-white w-screen'>
            <div className='relative top-16 py-8 md:px-4 lg:py-16 lg:px-20 xl:px-52 opacity-95
                flex flex-col items-center md:flex-row md:items-start min-h-screen w-full
                 bg-gradient-to-b from-slate-900 to-slate-950'>
                <img src={`https://image.tmdb.org/t/p/original${show?show.poster_path:""}`} 
                    className='h-[500px] w-[350px] lg:w-[450px] lg:h-[550px] rounded-lg'/>
                <div className='flex flex-col px-4 md:px-8 lg:pl-20 text-xl'>
                    <span className='text-2xl lg:text-5xl my-4'> {`${show && show.original_name} (${date.getFullYear()})`} </span>
                    <div> {show && show.genres.map((item, index) => <span className='mr-4 py-1 px-2 text-sm bg-pink-800 font-semibold rounded-md' key={index}> {item.name} </span>)}</div>
                    <span className='text-slate-400 italic text-xl my-4'> {show && show.tagline} </span>
                    
                    <div className='flex items-center my-5'>
                        <RatingCircle value={rating} />
                        <div className='mx-8 text-6xl p-1 border-2 rounded-full'>
                            <button> <i className="fa-solid fa-circle-play"></i> </button>
                        </div>
                        <span> Watch Trailer </span>
                    </div>
                    
                    {show && show.created_by.length?<div className='flex flex-wrap'>
                        <span> Creator :  &nbsp;</span>
                        {show && show.created_by.map((creator, index) => (
                            <div key={index}>
                              <span>{`${creator.name}`}, &nbsp; </span> 
                            </div>
                        ))}
                    </div>:null}

                    <p className='text-lg my-5 tracking-wide text-justify font-light line'> {show && show.overview} </p> 
                    
                    {show && show.next_episode_to_air && show.next_episode_to_air.overview !== ""
                        ?<div className='flex items-start'>
                            <button className='bg-red-400 px-4 py-2 rounded-lg min-w-72' 
                                onClick={() => setShowNextEpisode(!showNextEpisode)}> {`In the next episode >>> `} </button>
                            <p className={showNextEpisode?'ml-4':'hidden'}> In the next episode, {show.next_episode_to_air.overview} </p>  
                        </div>
                        :null
                    }

                </div>
            </div>
        </div>
        <div className='bg-slate-900 opacity-100 relative px-52 py-10 text-slate-300'>
            <span className='my-4 text-3xl'> All seasons </span>
            <div className='flex flex-wrap'>
                {show && show.seasons.map((season, index) => <SeasonCard key={index} series={show.original_name} obj={season} />)}
            </div>
        </div>
        </>
    )
}

export default ShowDetails;
