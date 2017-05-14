import * as ActionTypes from '../actions/constants';

const expenseReducer = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.ADD_EXPENSE: return (state, action.payload)
    case ActionTypes.GET_EXPENSE_AMOUNT_BY_MOUNT: return action.payload
    case ActionTypes.GET_EXPENSE_BY_ID: return action.payload
    case ActionTypes.GET_EXPENSE: return (state, action.payload)
    default: return state;
  }
}

export default expenseReducer;
