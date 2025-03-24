// import React from 'react'
// import { LuSend } from "react-icons/lu";

// const InfoSection = ({ trip }) => {

//   return (
//     <div>
//       <img src='/PlaceHolder.jpg' alt='Placeholder' className='h-[350px] w-full rounded-lg' />

//       <div className='flex justify-between items-center'>
//         <div className='my-5 flex flex-col gap-4'>
//           <h2 className='font-bold text-2xl'>{trip?.userSelection?.Location?.display_name}</h2>

//           <div className='flex gap-7'>
//             <h2 className='p-2 px-5 bg-gray-200 rounded-full text-gray-500 font-medium'>🗓️ {trip?.userSelection?.noOfDays} Days</h2>
//             <h2 className='p-2 px-5 bg-gray-200 rounded-full text-gray-500 font-medium'>💰 {trip?.userSelection?.Budget} Budget</h2>
//             <h2 className='p-2 px-5 bg-gray-200 rounded-full text-gray-500 font-medium'>🤵🏼 No. of Traveler : {trip?.userSelection?.Traveler}</h2>
//           </div>
//         </div>

//         <button className='text-[#384959] text-md font-bold py-2 px-3 rounded-xl bg-[#BDDDFC] hover:bg-[#88BDF2] cursor-pointer'>
//           <LuSend className='h-6 w-6' />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default InfoSection



import React, { useState, useEffect } from 'react';
import { LuSend } from "react-icons/lu";
import axios from 'axios';
import { Link } from 'react-router';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const InfoSection = ({ trip }) => {
  const [imageUrl, setImageUrl] = useState('/PlaceHolder.jpg');

  useEffect(() => {
    const fetchImage = async () => {
      if (!trip?.userSelection?.Location?.display_name) return;

      try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: { Authorization: PEXELS_API_KEY },
          params: { query: trip.userSelection.Location.display_name, per_page: 1 }
        });

        if (response.data.photos.length > 0) {
          setImageUrl(response.data.photos[0].src.original);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [trip]);

  return (
    <div>
      <img src={imageUrl} alt='Location' className='h-[350px] w-full rounded-lg object-cover' />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-4'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.Location?.display_name}</h2>

          <div className='flex gap-7'>
            <h2 className='p-2 px-5 bg-gray-200 rounded-full text-gray-500 font-medium'>🗓️ {trip?.userSelection?.noOfDays} Days</h2>
            <h2 className='p-2 px-5 bg-gray-200 rounded-full text-gray-500 font-medium'>💰 {trip?.userSelection?.Budget} Budget</h2>
            <h2 className='p-2 px-5 bg-gray-200 rounded-full text-gray-500 font-medium'>🤵🏼 No. of Traveler : {trip?.userSelection?.Traveler}</h2>
          </div>
        </div>

        <Link to={`https://www.google.com/maps/search/?api=1&query=${trip?.tripData?.tripDetails?.location}`} target='_blank'>
          <button className='text-[#384959] text-md font-bold py-2 px-3 rounded-xl bg-[#BDDDFC] hover:bg-[#88BDF2] cursor-pointer'>
            <LuSend className='h-6 w-6' />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InfoSection;
