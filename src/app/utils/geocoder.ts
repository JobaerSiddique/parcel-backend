// // utils/geocoding.ts
// import axios from 'axios';
// import AppError from '../error/AppError';
// import config from '../../config';

// export const geocodeAddress = async (address: string) => {
//   try {
//     // Debug: Check what key is being used
//     console.log('Using API Key:', config.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY);
    
//     const apiKey = config.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
    
//     if (!apiKey) {
//       throw new AppError(500, 'Google Maps API key is not configured');
//     }

//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
//     );

//     console.log('Geocoding response:', response.data); // Debug response

//     if (response.data.status === 'REQUEST_DENIED') {
//       console.error('Geocoding denied. Reason:', response.data.error_message);
//       throw new AppError(400, response.data.error_message || 'Geocoding service configuration error');
//     }

//     // Rest of your code...
//   } catch (err) {
//     console.error('Geocoding error:', err);
//     if (err instanceof AppError) throw err;
//     throw new AppError(503, 'Geocoding service temporarily unavailable');
//   }
// };

import axios from 'axios';

export const geocodeWithOSM = async (address: string) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        format: 'json',
        q: address,
        limit: 1,
        addressdetails: 1
      },
      headers: {
        'User-Agent': 'MyProject/1.0 (myemail@gmail.com)', // REQUIRED
        'Accept-Language': 'en'
      },
      timeout: 3000
    });

    if (!response.data?.length) return null;

    const { lat, lon, display_name, address: details } = response.data[0];
    return {
      coordinates: [parseFloat(lon), parseFloat(lat)],
      address: display_name,
      details: details // Contains breakdown (city, country, etc.)
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};