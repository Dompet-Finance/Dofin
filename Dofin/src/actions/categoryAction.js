import * as ActionTypes from './constants';
import axios from 'axios'

export const postCategory = data => ({
  type: ActionTypes.NEW_CATEGORY,
  payload: data,
});

export const postRequestCategory = data => {
  return dispatch =>
    axios.put('http://192.168.0.209:8080/users/59169da29a208a785ad2e99c/categories', {
      category: data.category,
      icon: data.icon_name,
      color: data.color
    })
    .then(response => dispatch(postCategory(response.data)))
    .catch(err => console.log(err.message))
};
