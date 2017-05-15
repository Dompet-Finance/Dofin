import { POST_IMAGE } from './constants';
import axios from 'axios'
const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com'

export const postImage = data => ({
  type: POST_IMAGE,
  payload: data,
});

export const imgPostRequest = newImage => {
  return dispatch => {
    console.log(newImage)
    return axios.post(host + '/expenses/photo', {blob: {
          type: newImage.type,
          data: newImage.data
        }})
          .then(res => {
            console.log(res)
            return dispatch(postImage([
              { item: 'MUFFIN, REGULAR, BLUEBERRY 1 x', price: 27000 },
              { item: 'MUFFIN, REGULAR, BLUEBERRY 1 x', price: 27000 },
              { item: 'CAFFE LATTE, GRANDE, 1X', price: 40000 },
              { item: 'CSR DONATION 1x', price: 1000 } ]
            ))
          })
          .catch(err => {
            console.log(err)
          })
  }

};
