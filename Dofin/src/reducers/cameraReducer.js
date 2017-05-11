import { POST_IMAGE } from '../actions/constants';

const postImage = (state, newImage) => {
  const { uri } = newImage
  const ids = state.map((image) => {
    if (image.id !== undefined) {
      return image.id;
    } else {
      return 1;
    }
  });
  const uniqueId = Math.max(...ids) + 1;
  const addedImage = {
    id: uniqueId,
    uri,
  }
  const newState = [...state, addedImage];
  return newState;
}

const cameraReducer = (state = [], action) => {
  switch(action.type) {
    case POST_IMAGE: return postImage(state, action.payload)
    default: return state;
  }
}

export default cameraReducer;
