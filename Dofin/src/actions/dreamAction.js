import * as ActionTypes from './constants';
import axios from 'axios'

export const postDream = data => ({
  type: ActionTypes.NEW_DREAM,
  payload: data,
});

export const getDream = data => ({
  type: ActionTypes.GET_DREAM,
  payload: data,
});


export const dreamRequest = data => {
  return dispatch =>
    axios.post('http://192.168.0.18:8080/dreams', {
      record_by: "59158e804412792833f91138",
      dream: data.dream,
    })
    .then(response => dispatch(postDream(response.data)))
    .catch(err => console.log(err.message))
};

export const getDreamRequest = () => {
  return dispatch =>
    axios.get('http://192.168.0.18:8080/dreams/59158e804412792833f91138')
    .then(response => dispatch(getDream(response.data)))
    .catch(err => console.log(err.message))
};
