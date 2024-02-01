import React from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = ({count}) => {
  return Array(count)
    .fill(0)
    .map((item, index) => (
      <div className='flex flex-col w-32 md:w-48 lg:w-60 m-5' key={index}>
          <div className='w-32 h-40 md:w-48 md:h-56 lg:w-60 lg:h-72 xl:h-80 m-5'>  
            <Skeleton height={"100%"} width={"100%"} />
          </div>
          <Skeleton width={"100%"} count={1} />
      </div>
      )
    )  
}

export default CardSkeleton;
