import React from 'react';
import { useSelector } from 'react-redux';
import { dataSelector } from '../redux/reducers/dataReducer';
import Card from "../cards/Card";
import VideoPopup from '../components/VideoPopup';

const SearchResults = () => {
  const searchResults = useSelector(dataSelector).searchResults;

  return (
    <div className='relative top-16 bg-slate-900 text-white min-h-screen px-36 py-2'>
      <h1 className='text-3xl my-5'> Search Results </h1>
      <div className='flex flex-wrap justify-between'>
        {searchResults
          ?searchResults.map((obj, index) => 
            <Card item={obj} key={index} page={obj.media_type==="movie"?"movies":"shows"} />
            )
          :<h1> There are no results for your search query.</h1>
        }
      </div>
      <VideoPopup />
    </div>
  )
}

export default SearchResults;
