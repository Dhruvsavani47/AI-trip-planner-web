import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Fix incorrect import

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const UserTripCardItem = ({ trip }) => {
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
        <Link 
            to={`/view-trip/${trip.id}`} 
            className="bg-white rounded-xl shadow-md p-4 transition-transform duration-300 hover:scale-105"
        >
            <div className="flex flex-col space-y-3">
                <img 
                    src={imageUrl} 
                    alt="Trip Destination"
                    className="w-full h-56 object-cover rounded-xl"
                />

                <div className="text-gray-800">
                    <h2 className="text-lg font-semibold">{trip?.userSelection?.Location?.display_name}</h2>
                    <p className="text-sm text-gray-600">
                        {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.Budget} Budget
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCardItem;