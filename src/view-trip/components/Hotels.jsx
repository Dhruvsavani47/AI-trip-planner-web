// import React from 'react'
// import { Link } from 'react-router'

// const Hotels = ({ trip }) => {
//     return (
//         <div>
//             <h2 className='text-xl font-bold mt-5'>Hotel Recommendation</h2>

//             <div className='grid 2xl:grid-cols-3 md:grid-cols-2 gap-8 mt-10'>
//                 {trip?.tripData?.hotelOptions?.map((hotel, index) => (
//                     <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} , ${hotel?.hotelAddress}`} target='_blank'>
//                         <div key={index} className='bg-white shadow-lg p-[13px] hover:scale-105 transition-all cursor-pointer rounded-lg'>
//                             <img src="/PlaceHolder.jpg" className='h-35 w-50 object-cover rounded-xl' />
//                             <div className='my-2 flex flex-col gap-1.5'>
//                                 <h3 className='text-lg font-semibold'>{hotel?.hotelName}</h3>
//                                 <p className='text-sm text-gray-500 mt-1'>📍 {hotel?.hotelAddress}</p>
//                                 <p className='text-sm mt-1'>💰 {hotel?.price} {trip.tripData.currency} per Night</p>
//                                 <p className='text-sm mt-1'>⭐ {hotel?.rating}</p>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Hotels



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const BASE_URL = 'https://api.pexels.com/v1/search';

const Hotels = ({ trip }) => {
    const [hotelImages, setHotelImages] = useState({});

    useEffect(() => {
        const fetchHotelImages = async () => {
            if (!trip?.tripData?.hotelOptions) return;

            const imagePromises = trip.tripData.hotelOptions.map(async (hotel) => {
                try {
                    const response = await axios.get(BASE_URL, {
                        headers: { Authorization: PEXELS_API_KEY },
                        params: { query: hotel.hotelName + " hotel", per_page: 1 }
                    });

                    return { hotelName: hotel.hotelName, imageUrl: response.data.photos[0]?.src.medium || "/PlaceHolder.jpg" };
                } catch (error) {
                    console.error('Error fetching image:', error);
                    return { hotelName: hotel.hotelName, imageUrl: "/PlaceHolder.jpg" };
                }
            });

            const images = await Promise.all(imagePromises);
            const imagesMap = images.reduce((acc, item) => {
                acc[item.hotelName] = item.imageUrl;
                return acc;
            }, {});

            setHotelImages(imagesMap);
        };

        fetchHotelImages();
    }, [trip]);

    return (
        <div>
            <h2 className='text-xl font-bold mt-5'>Hotel Recommendation</h2>

            <div className='grid 2xl:grid-cols-3 md:grid-cols-2 gap-8 mt-10'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <div key={index} className='bg-white shadow-lg p-[13px] hover:scale-105 transition-all cursor-pointer rounded-lg'>
                        <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName}, ${hotel?.hotelAddress}`} target='_blank'>
                            <img src={hotelImages[hotel.hotelName] || "/PlaceHolder.jpg"} className='h-35 w-50 object-cover rounded-xl' alt={hotel.hotelName} />
                        </Link>
                        <div className='my-2 flex flex-col gap-1.5'>
                            <h3 className='text-lg font-semibold'>{hotel?.hotelName}</h3>
                            <p className='text-sm text-gray-500 mt-1'>📍 {hotel?.hotelAddress}</p>
                            <p className='text-sm mt-1'>💰 {hotel?.price} {trip?.tripData?.tripDetails?.currency} per Night</p>
                            <p className='text-sm mt-1'>⭐ {hotel?.rating}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
