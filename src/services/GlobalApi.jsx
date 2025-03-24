import axios from 'axios';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; 
const BASE_URL = 'https://api.pexels.com/v1/search';

export async function fetchPlaceImages(place, perPage = 1) {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: PEXELS_API_KEY
            },
            params: {
                query: place,
                per_page: perPage
            }
        });

        const photos = response.data.photos.map(photo => ({
            id: photo.id,
            photographer: photo.photographer,
            imageUrl: photo.src.large
        }));

        console.log('Images:', photos);
        return photos;
    } catch (error) {
        console.error('Error fetching images:', error.message);
        return [];
    }
}
