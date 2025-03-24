import React from 'react'

const Button = ({ buttonText, onGenerateTrip }) => {
  return (
    <div>
      <button className='text-[#384959] text-md font-bold py-2 px-8 rounded-xl bg-[#BDDDFC] hover:bg-[#88BDF2] cursor-pointer' onClick={onGenerateTrip}>{buttonText}</button>
    </div>
  )
}

export default Button
