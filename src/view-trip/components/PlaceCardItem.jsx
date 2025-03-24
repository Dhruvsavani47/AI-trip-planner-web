// // import React from 'react'
// // import { FaMapLocationDot } from "react-icons/fa6";
// // import { Link } from 'react-router';


// // const PlaceCardItem = ({ act }) => {
// //     return (
// //         <Link to={`https://www.google.com/maps/search/?api=1&query=${act?.placeName}`} target='_blank'>
// //             <div className='flex gap-5'>
// //                 <img src="/PlaceHolder.jpg" className='h-35 w-50 object-cover rounded-xl' />

// //                 <div>
// //                     <h2 className='font-bold text-lg'>{act.placeName}</h2>
// //                     <p>{act.placeDetails}</p>
// //                     <h2>🕙 {act.travelTime}</h2>

// //                     <button className='text-[#384959] text-md font-bold py-2 px-3 rounded-xl bg-[#BDDDFC] hover:bg-[#88BDF2] cursor-pointer'><FaMapLocationDot /></button>
// //                 </div>
// //             </div>
// //         </Link>
// //     )
// // }

// // export default PlaceCardItem



// import React from "react";
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from "react-router-dom"; // Corrected import

// const PlaceCardItem = ({ act }) => {
//     return (
//         <Link
//             to={`https://www.google.com/maps/search/?api=1&query=${act?.placeName}`}
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//             <div className="flex items-center gap-6 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300   ">
//                 {/* Image Section */}
//                 <img
//                     src="/PlaceHolder.jpg"
//                     alt={act?.placeName || "Place"}
//                     className="h-28 w-40 object-cover rounded-lg"
//                 />

//                 {/* Content Section */}
//                 <div className="flex-1">
//                     <h2 className="font-semibold text-lg text-gray-800">{act?.placeName}</h2>
//                     <p className="text-gray-600 text-sm mt-1">{act?.placeDetails}</p>
//                     <h2 className="text-gray-700 text-sm font-medium mt-2">🕙 {act?.travelTime}</h2>
//                 </div>

//                 {/* Button */}
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition duration-300 cursor-pointer">
//                     <FaMapLocationDot size={20} />
//                 </button>
//             </div>
//         </Link>
//     );
// };

// export default PlaceCardItem;



import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // Replace with your Pexels API key
const BASE_URL = "https://api.pexels.com/v1/search";

const PlaceCardItem = ({ act }) => {
    const [imageUrl, setImageUrl] = useState("/PlaceHolder.jpg"); // Default image

    useEffect(() => {
        const fetchImage = async () => {
            if (!act?.placeName) return;

            try {
                const response = await axios.get(BASE_URL, {
                    headers: { Authorization: PEXELS_API_KEY },
                    params: { query: act?.placeName, per_page: 1 }
                });

                if (response.data.photos.length > 0) {
                    setImageUrl(response.data.photos[0].src.medium);
                }
            } catch (error) {
                console.error("Error fetching image:", error.message);
            }
        };

        fetchImage();
    }, [act?.placeName]);

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${act?.placeName}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="flex items-center gap-6 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
                {/* Image Section */}
                <img
                    src={imageUrl}
                    alt={act?.placeName || "Place"}
                    className="h-28 w-40 object-cover rounded-lg"
                />

                {/* Content Section */}
                <div className="flex-1">
                    <h2 className="font-semibold text-lg text-gray-800">{act?.placeName}</h2>
                    <p className="text-gray-600 text-sm mt-1">{act?.placeDetails}</p>
                    <h2 className="text-gray-700 text-sm font-medium mt-2">🕙 {act?.travelTime}</h2>
                </div>

                {/* Button */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition duration-300 cursor-pointer">
                    <FaMapLocationDot size={20} />
                </button>
            </div>
        </Link>
    );
};

export default PlaceCardItem;
