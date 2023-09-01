import React from 'react'
import Image from 'next/image'
import graphic  from "../../../../public/images/people-working-together-online.svg"; 

type heroSectionPropsValuesType = {
    title: string,
    description: string,
    buttonText: string,
}

type heroSectionPropsType = {
    content: heroSectionPropsValuesType
}

const HeroSection:React.FC<heroSectionPropsType> = ({content}) => {
  return (
    <>
    <div className='px-8   md:px-12 my-20 h-[58vh]    '>
        {/* text-content */}
        <div className='flex justify-between w-full  items-center'>

      
        <div >
        <h2 className='font-bold text-lg md:text-2xl lg:text-5xl'>MIQ</h2>
            <div className='py-2'>
            <h1  className='font-bold text-3xl  md:text-4xl lg:text-6xl'>{content.title} </h1>
            <p className='font-bold  w-fit max-w-sm'>{content.description}</p>
            </div>
        <button className=' px-8 py-4 w-full sm:w-fit bg-primaryColor text-white font-bold rounded-full text-lg'>{content.buttonText}</button>
        </div>
        
        <Image src={graphic} className='md:w-[300px] lg:w-[600px] hidden md:block' alt='graphic' />
   </div>

    </div>
    </>
  )
}


export default HeroSection;