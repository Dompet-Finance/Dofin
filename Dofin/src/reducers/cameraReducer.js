import * as ActionTypes from '../actions/constants';

const initialState = {
  loading: false,
  getItems: [
    // { item: '', price: 0 },
    // { item: '', price: 0 },
  ]
}

const postImage = (state, payload) => {
  let newState = {
    ...state,
    getItems: payload
  }
  return newState
}

const setLoading = (state, payload) => {
  let newState = {
    ...state,
    loading: payload
  }
  return newState
}

const resetItems = (state, payload) => {
  let newState = {
    ...state,
    getItems: []
  }
  return newState
}

const cameraReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case ActionTypes.POST_IMAGE: return postImage(state, payload)
    case 'SET_LOADING': return setLoading(state, payload)
    case 'RESET_ITEMS': return resetItems(state, payload)
    default: return state;
  }
}

export default cameraReducer;
