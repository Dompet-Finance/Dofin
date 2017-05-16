import * as ActionTypes from './constants';
import axios from 'axios'

export const postUser = data => ({
  type: ActionTypes.NEW_USER,
  payload: data,
});

export const getUser = data => ({
  type: ActionTypes.GET_USER,
  payload: data,
});

export const logout = () => ({
  type: ActionTypes.DELETE_USER,
  payload: false,
});


export const signUpRequest = data => {
  return dispatch =>
    axios.post('http://192.168.0.209:8080/users/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    })
    .then(response => dispatch(postUser(response.data)))
    .catch(err => console.log(err.message))
};

export const signInRequest = data => {
  return dispatch =>
    axios.post('http://192.168.0.209:8080/users/signin', {
      email: data.email,
      password: data.password
    })
    .then(response => dispatch(getUser(response.data)))
    .catch(err => console.log(err.message))
};
