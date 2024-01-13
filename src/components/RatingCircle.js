import React from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RatingCircle = ({value}) => {
  return (
    <div className='w-20 h-20' id='circleRating'>
        <CircularProgressbar
            value={value} 
            maxValue={10} 
            text={value} 
            styles={buildStyles({pathColor:"green"})} />
    </div>
  )
}

export default RatingCircle;
