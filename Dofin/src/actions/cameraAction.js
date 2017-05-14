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
  .then(res => dispatch(postImage([ { item: 'MUFFIN, REGULAR, BLUEBERRY 1 x', price: 27000 },
  { item: 'MUFFIN, REGULAR, BLUEBERRY 1 x', price: 27000 },
  { item: 'CAFFE LATTE, GRANDE, 1X', price: 40000 },
  { item: 'CSR DONATION 1x', price: 1000 } ]
)))
  .catch(err => console.log(err.message))
};
