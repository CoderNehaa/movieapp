import React from 'react'
import Skeleton from 'react-loading-skeleton'

const DetailsSkeleton = () => {
  return (
    <div className='relative top-16 py-8 md:px-4 lg:py-16 lg:px-20 xl:px-52 min-h-screen h-screen w-full
    flex flex-col items-center justify-around md:flex-row md:items-start bg-slate-900 opacity-90'>

        <div className='h-[600px] w-[430px] rounded-lg'> <Skeleton height={"100%"} /> </div>
        
        <div id="right" className='w-[550px] my-6 h-4/5'>
            <Skeleton height={"40px"} width={"50%"} /> 
            <Skeleton height={"25px"} width={"100%"} style={{marginTop:"15px"}} />
            <div className='flex my-8 items-center'>
                <Skeleton height={"80px"} width={"80px"} circle style={{marginRight:"15px"}} /> 
                <Skeleton height={"60px"} width={"60px"} circle style={{marginRight:"15px"}} /> 
                <Skeleton height={"60px"} width={"60px"} circle style={{marginRight:"15px"}} /> 
                <Skeleton height={"30px"} width={"180px"} />
            </div>
            <div className='h-10 mb-20'>
                <Skeleton width={"70%"} height={"100%"} style={{marginBottom:"5px"}}/>
                <Skeleton width={"70%"} height={"100%"}  />
            </div>
            <div className='my-2'>
                <Skeleton count={5} width={"100%"} />
            </div>

        </div>
    </div>
  )
}

export default DetailsSkeleton
