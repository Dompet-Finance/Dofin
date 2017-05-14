import * as ActionTypes from '../actions/constants';

const categoryReducer = (state = "", action) => {
  switch(action.type) {
    case ActionTypes.NEW_CATEGORY: return action.payload
    case ActionTypes.GET_CATEGORY: return action.payload
    case ActionTypes.UPDATE_CATEGORY: return action.payload
    case ActionTypes.DELETE_CATEGORY: return action.payload
    default: return state;
  }
}

export default categoryReducer;
