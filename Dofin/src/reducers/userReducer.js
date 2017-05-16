import * as ActionTypes from '../actions/constants';

function clearUser(state, payload){
  state = 0
  return state
}

const userReducer = (state = 0, action) => {
  switch(action.type) {
    case ActionTypes.NEW_USER: return (state, action.payload)
    case ActionTypes.GET_USER: return (state, action.payload)
    case ActionTypes.DELETE_USER: return clearUser(state, action.payload)
    default: return state;
  }
}

export default userReducer;
