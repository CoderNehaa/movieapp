import React from 'react';
import Spinner from 'react-spinner-material';

const LoaderSpinner = () => {
  return (
    <div className='flex justify-center'>
      < Spinner 
        radius={100} 
        color={"darkblue"} 
        stroke={7} 
        visible={true} />
    </div>
  )
}

export default LoaderSpinner;
