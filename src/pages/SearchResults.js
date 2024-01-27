import React from 'react';
import { useSelector } from 'react-redux';
import { dataSelector } from '../redux/reducers/dataReducer';
import Card from "../cards/Card";
import VideoPopup from '../components/VideoPopup';

const SearchResults = () => {
  const {searchResults} = useSelector(dataSelector);

  return (
    <div className='relative top-16 bg-slate-900 text-white min-h-screen px-2 lg:px-36 py-2'>
      <h1 className='text-xl lg:text-3xl my-2 lg:my-5 px-10'> Search Results </h1>
      <div className='flex flex-wrap justify-evenly lg:justify-between'>
        {searchResults
          ?searchResults.map((obj, index) => 
            <Card item={obj} key={index} mediaType={obj.media_type==="movie"?"movies":"shows"} />
            )
          :<h1> There are no results for your search query.</h1>
        }
      </div>
      <VideoPopup />
    </div>
  )
}

export default SearchResults;
