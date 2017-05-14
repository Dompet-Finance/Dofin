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

export const updateCategory = data => ({
  type: ActionTypes.UPDATE_CATEGORY,
  payload: data,
});

export const deleteCategory = data => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload: data,
});

export const postRequestCategory = data => {
  return dispatch =>
    axios.put('http://192.168.0.209:8080/users/59169dd60de1b3789527f322/categories', {
      category: data.category,
      icon: data.icon_name,
      color: data.color
    })
    .then(response => dispatch(postCategory(response.data)))
    .catch(err => console.log(err.message))
};

export const getRequestCategory = data => {
  return dispatch =>
    axios.get('http://192.168.0.209:8080/users/59169dd60de1b3789527f322')
    .then(response => dispatch(getCategory(response.data)))
    .catch(err => console.log(err.message))
};

export const updateRequestCategory = data => {
  return dispatch =>
    axios.patch('http://192.168.0.209:8080/users/'+data.user_id+'/categories', {
      new_category  : data.category,
      old_category  : data.old_category,
      new_icon      : data.icon,
      new_color     : data.color
    })
    .then(response => dispatch(updateCategory(response.data)))
    .catch(err => console.log(err.message))
};

export const deleteRequestCategory = data => {
  return dispatch =>
    axios.put('http://192.168.0.209:8080/users/'+data.id+'/categories/delete', {
      category: data.category
    })
    .then(response => dispatch(deleteCategory(response.data)))
    .catch(err => console.log(err.message))
};
