import { POST_IMAGE } from './constants';
import axios from 'axios'

export const postImage = newImage => ({
  type: POST_IMAGE,
  payload: newImage,
});

export const imgPostRequest = newImage => (
  dispatch =>
  axios.post('http://localhost:8081/', { newImage })
  .then(res => console.log(res))
  .catch(err => console.log(err.message))
);
