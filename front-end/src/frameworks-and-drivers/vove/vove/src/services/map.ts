import axios from 'axios';

export const getLocationName = (lat: number, lng: number) => {
  return axios.get('https://geocode.maps.co/reverse?lat=' + lat + '&lon=' + lng);
};

export const getLocationLatLng = (placeId: string, apiKey: string) => {
  return axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=' + apiKey);
};

export const postGetPredictionSummary = (
  locations: [
    {
      lat: number,
      lng: number,
      locationCode: string,
      idx: number
    }
  ]
) => {
  return axios.post(
    'https://vove-managed.com/api/prediction/summary',
    {
      locations: locations
    });
};

export const postGetDistrictSummary = (
  locations: [
    {
      lat: number,
      lng: number,
      locationCode: string,
      idx: number
    }
  ]
) => {
  return axios.post(
    'https://vove-managed.com/api/prediction/summary',
    {
      locations: locations
    });
};