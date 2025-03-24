import React from 'react'
import Button from './Button'
import { Link } from 'react-router'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[45px] text-center mt-16'>
        <span className='text-[#6A89A7]'>Discover Your Next Adventure With AI : </span>
        Personalized Itineraries at Your Fingertips
      </h1>

      <p className='text-[18px] text-[#384959] text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interest and budget.</p>

      <Link to={'/create-trip'}>
        <Button buttonText="Get Started, It' Free" className='bg-black' />
      </Link>

      <img src="/hero.png" alt="" className='mt-20 border-8 rounded-3xl'/>
    </div>
  )
}

export default Hero
