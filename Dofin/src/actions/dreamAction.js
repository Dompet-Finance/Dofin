import * as ActionTypes from './constants';
import axios from 'axios'
const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com'

export const postDream = data => ({
  type: ActionTypes.NEW_DREAM,
  payload: data,
});

export const getDream = data => ({
  type: ActionTypes.GET_DREAM,
  payload: data,
});

export const updateDream = data => ({
  type: ActionTypes.UPDATE_DREAM,
  payload: data,
});

export const deleteDream = data => ({
  type: ActionTypes.DELETE_DREAM,
  payload: data,
});


export const dreamRequest = data => {
  return dispatch =>
    axios.post(host+'/dreams', {
      record_by: "59158e804412792833f91138",
      dream: data.dream,
      description: data.description,
    })
    .then(response => dispatch(postDream(response.data)))
    .catch(err => console.log(err.message))
};

export const getDreamRequest = () => {
  return dispatch =>
    axios.get(host+'/dreams/59158e804412792833f91138')
    .then(response => dispatch(getDream(response.data)))
    .catch(err => console.log(err.message))
};

export const updateDreamRequest = data => {
  return dispatch =>
    axios.put(host+'/dreams/59158e804412792833f91138', {
      record_by: "59158e804412792833f91138",
      dream: data.dream,
      description: data.description,
      _id: data._id
    })
    .then(response => dispatch(updateDream(response.data)))
    .catch(err => console.log(err.message))
};

export const deleteDreamRequest = data => {
  return dispatch =>
    axios.delete(host+'/dreams/'+data._id)
    .then(response => dispatch(deleteDream(response.data)))
    .catch(err => console.log(err.message))
};
