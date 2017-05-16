import { PLACES_REQUEST } from './constants';
import axios from 'axios'

export const places = data => ({
  type: PLACES_REQUEST,
  payload: data,
});

export const placesRequest = latlng => {
  return dispatch =>
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlng.coords.latitude}, ${latlng.coords.longitude}&radius=2000&key=AIzaSyDLZwTV-ZFJAFfSA77KROaB2Fq-iueXtW4`)
  .then(res => dispatch(places(res.data.results)))
  .catch(err => console.log(err.message))
};
