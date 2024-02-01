import React from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RatingCircle = ({value}) => {
  return (
    <div className='w-full h-full' id='circleRating'>
        <CircularProgressbar
            value={value} 
            maxValue={10} 
            text={value} 
            styles={buildStyles({pathColor:value<5?"red":value<7?"orange":"green"})} />
    </div>
  )
}

export default RatingCircle;
