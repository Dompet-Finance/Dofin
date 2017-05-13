import * as ActionTypes from '../actions/constants';

const addExpense = (state, newExpense) => {
  const { nominal, item, category, location, date, photo } = newExpense
  const ids = state.map((image) => {
    if (image.id !== undefined) {
      return image.id;
    } else {
      return 1;
    }
  });
  const uniqueId = Math.max(...ids) + 1;
  const addedExpense = {
    id: uniqueId,
    nominal,
    item,
    category,
    location,
    date,
    photo,
  }
  const newState = [...state, addedExpense];
  return newState;
}

const expenseReducer = (state = 0, action) => {
  switch(action.type) {
    case ActionTypes.ADD_EXPENSE: return (state, action.payload)
    // case ActionTypes.GET_EXPENSE_AMOUNT: return action.payload
    case ActionTypes.GET_EXPENSE_BY_ID: return action.payload
    default: return state;
  }
}

export default expenseReducer;
