import { POST_IMAGE } from './constants';

export const postImage = newImage => ({
  type: POST_IMAGE,
  payload: newPass,
});

export const imgPostRequest = newImage => (
  dispatch =>
  axios.post('http://localhost:1234/passwords', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newImage),
  })
  .then(res => res.json())
  .then(data => dispatch(addPassword(data)))
  .catch(err => console.log(err.message))
);
