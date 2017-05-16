import { POST_IMAGE } from './constants';
import axios from 'axios'

export const postImage = data => ({
  type: POST_IMAGE,
  payload: data,
});

export const imgPostRequest = newImage => {
  return dispatch =>
  axios.post('http://192.168.0.209:8080/expenses/photo', {blob: {
    type: newImage.type,
    data: newImage.data
  }})
  .then(res => dispatch(postImage(res.data)))
  .catch(err => console.log(err.message))
};
