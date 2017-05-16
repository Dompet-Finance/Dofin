import { PLACES_REQUEST } from './constants';
import axios from 'axios'

export const places = data => ({
  type: PLACES_REQUEST,
  payload: data,
});

export const placesRequest = latlng => {
  return dispatch =>
  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-6.260686,%20106.781708&radius=2000&key=AIzaSyDLZwTV-ZFJAFfSA77KROaB2Fq-iueXtW4')
  .then(res => dispatch(places(res.data.results)))
  .catch(err => console.log(err.message))
};
