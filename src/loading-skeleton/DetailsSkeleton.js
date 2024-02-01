import React from 'react';
import Skeleton from 'react-loading-skeleton';

const DetailsSkeleton = () => {
  return (
    <div className='bg-slate-900 relative top-16 px-4 lg:px-52 py-5 md:py-12 xl:py-28 w-full min-h-screen h-full 
        flex flex-col md:flex-row'>

        <div className='h-[550px] w-[350px] lg:w-[480px] lg:h-[600px] rounded-lg mr-10'> 
            <Skeleton height={"500px"} width={"350px"} /> 
        </div>
        
        <div id="right" className='w-full h-4/5 p-4'>
            <Skeleton height={"40px"} width={"50%"} /> 
            <Skeleton height={"25px"} width={"100%"} style={{marginTop:"15px"}} />

            <div className='flex my-8 items-center'>
                <Skeleton height={"80px"} width={"80px"} circle style={{marginRight:"15px"}} /> 
                <Skeleton height={"60px"} width={"60px"} circle style={{marginRight:"15px"}} /> 
                <Skeleton height={"60px"} width={"60px"} circle style={{marginRight:"15px"}} /> 
                {/* <Skeleton height={"30px"} width={"180px"} /> */}
            </div>
            <div className='h-10 mb-20'>
                <Skeleton width={"100%"} height={"100%"} style={{marginBottom:"5px"}}/>
                <Skeleton width={"100%"} height={"100%"}  />
            </div>
            <div className='my-2'>
                <Skeleton count={5} width={"100%"} />
            </div>

        </div>
    </div>
  )
}

export default DetailsSkeleton;
