import * as ActionTypes from '../actions/constants';

const incomeReducer = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.NEW_INCOME: return (state, action.payload)
    case ActionTypes.GET_INCOME: return action.payload
    default: return state;
  }
}

export default incomeReducer;
