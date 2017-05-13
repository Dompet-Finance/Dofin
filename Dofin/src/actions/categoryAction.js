import * as ActionTypes from './constants';
import axios from 'axios'

export const postCategory = data => ({
  type: ActionTypes.NEW_CATEGORY,
  payload: data,
});

export const getCategory = data => ({
  type: ActionTypes.GET_CATEGORY,
  payload: data,
});

export const postRequestCategory = data => {
  return dispatch =>
    axios.put('http://192.168.0.18:8080/users/59169dd60de1b3789527f322/categories', {
      category: data.category,
      icon: data.icon_name,
      color: data.color
    })
    .then(response => dispatch(postCategory(response.data)))
    .catch(err => console.log(err.message))
};


export const getRequestCategory = data => {
  return dispatch =>
    axios.get('http://192.168.0.18:8080/users/59169dd60de1b3789527f322')
    .then(response => dispatch(getCategory(response.data)))
    .catch(err => console.log(err.message))
};
