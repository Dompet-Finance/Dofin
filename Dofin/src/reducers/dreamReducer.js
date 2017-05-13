import * as ActionTypes from '../actions/constants';

let dataDream = []

const dreamReducer = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.NEW_DREAM: return (state, action.payload)
    case ActionTypes.GET_DREAM: return action.payload
    default: return state;
  }
}

export default dreamReducer;
