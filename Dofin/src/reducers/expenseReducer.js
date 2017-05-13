import * as ActionTypes from '../actions/constants';

const addExpense = (state = [], newExpense) => {
  console.log(newExpense);
  const { amount, description, category } = newExpense
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
    amount,
    description,
    category,
  }
  const newState = [...state, addedExpense];
  return newState;
}

const expenseReducer = (state = 0, action) => {
  switch(action.type) {
    case ActionTypes.ADD_EXPENSE: return (state, action.payload)
    case ActionTypes.GET_EXPENSE_AMOUNT_BY_MOUNT: return action.payload
    case ActionTypes.GET_EXPENSE_BY_ID: return action.payload
    default: return state;
  }
}

export default expenseReducer;
