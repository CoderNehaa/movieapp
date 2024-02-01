import React from 'react';
import { useSelector } from 'react-redux';
import { dataSelector } from '../redux/reducers/dataReducer';
import Card from "../cards/Card";
import CardSkeleton from '../loading-skeleton/CardSkeleton';

const SearchResults = () => {
  const {searchResults, loading} = useSelector(dataSelector);

  return (
    <div className='relative top-16 bg-slate-900 text-white min-h-screen px-2 lg:px-36 py-2
    bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-900'>
      <h1 className='text-xl lg:text-3xl my-2 lg:my-5 px-10'> Search Results </h1>
      <div className='flex flex-wrap justify-evenly lg:justify-between'>
        {loading && <CardSkeleton count={20} />}
        {searchResults
          ?searchResults.map((obj, index) => 
            <Card item={obj} key={index} mediaType={obj.media_type==="movie"?"movies":"shows"} />
            )
          :<h1> There are no results for your search query.</h1>
        }
      </div>
    </div>
  )
}

export default SearchResults;
