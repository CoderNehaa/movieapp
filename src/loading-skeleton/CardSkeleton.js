import React from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = ({count}) => {
  return Array(count)
    .fill(0)
    .map((item, index) => (
      <div className='flex flex-col justify-start w-60 my-5' key={index}>
          <div>  
            <div className='m-2'><Skeleton height={"320px"} width={"100%"} /></div>
            <Skeleton width={"100%"} count={1} />
          </div>
      </div>
      )
    )
  
}

export default CardSkeleton;
