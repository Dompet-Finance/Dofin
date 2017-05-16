import { POST_NOTIFICATION, GET_NOTIFICATIONS } from './constants';
import axios from 'axios'

export const postNotif = data => ({
  type: ActionTypes.POST_NOTIFICATION,
  payload: data,
});

export const getNotif = data => ({
  type: ActionTypes.GET_NOTIFICATIONS,
  payload: data,
});

export const notifRequest = notification => {
  return dispatch =>
    axios.post('http://192.168.0.209:8080/notification', {notification})
    .then(response => dispatch(postNotif(response.data)))
    .catch(err => console.log(err.message))
};

export const getNotifRequest = () => {
  return dispatch =>
    axios.get('http://192.168.0.209:8080/notification/59158e804412792833f91138')
    .then(response => dispatch(getNotif(response.data)))
    .catch(err => console.log(err.message))
};
