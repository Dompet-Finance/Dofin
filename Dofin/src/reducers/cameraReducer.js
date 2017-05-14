import * as ActionTypes from '../actions/constants';

const image = (state, payload) => {
  console.log(payload);
  return [...state, payload]
}

const cameraReducer = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.POST_IMAGE: return image(state, action.payload)
    default: return state;
  }
}

export default cameraReducer;
