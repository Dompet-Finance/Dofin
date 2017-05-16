import { POST_IMAGE } from './constants';
import axios from 'axios'
const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com'

export const postImage = data => ({
  type: POST_IMAGE,
  payload: data,
});

export const setLoading = data => ({
  type: 'SET_LOADING',
  payload: data,
});

export const resetItems = data => ({
  type: 'RESET_ITEMS',
  payload: [],
});

export const imgPostRequest = newImage => {
  return dispatch => {
    // console.log(newImage)
    return axios.post(host + '/expenses/photo', {blob: {
          type: newImage.type,
          data: newImage.data
        }})
          .then(res => {
            // console.log(res.data)
            dispatch(setLoading(false))
            let initialState = [{item: '', price: ''}]
            return dispatch(postImage(res.data.length ?
              res.data : initialState ))
          })
          .catch(err => {
            console.log(err)
          })
  }

};
