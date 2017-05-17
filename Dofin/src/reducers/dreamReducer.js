import * as ActionTypes from '../actions/constants';

const getDream = (state, payload) => {
  return payload
}

const addDream = (state, payload) => {
  let newState = [
    ...state,
    payload
  ]
  return newState
}

const updateDream = (state, payload) => {
  let newPayload = state.map(val => {
    if (val._id === payload._id) {
      return payload
    }
    return val
  }
  )
  return newPayload
}

const deleteDream = (state, payload) => {
  let newPayload = state.filter(val =>
    val._id !== payload._id
  )
  return newPayload
}

const dreamReducer = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.NEW_DREAM    : return addDream(state, action.payload)
    case ActionTypes.GET_DREAM    : return action.payload
    case ActionTypes.UPDATE_DREAM : return updateDream(state, action.payload)
    case ActionTypes.DELETE_DREAM : return deleteDream(state, action.payload)
    default: return state;
  }
}

export default dreamReducer;
