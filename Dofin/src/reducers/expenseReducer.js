import * as ActionTypes from '../actions/constants';

const initialState = {
  errorMessage: '',
  successMessage: '',
  data: [],
}

const addExpense = (state) => {
  let newState = {
    ...state,
  }
  return newState
}

const addExpenseFail = (state, payload) => {
  // console.log(payload)
  let newState = {
    ...state,
    errorMessage: 'Fail'
  }
  return newState
}

const addExpenseSuccess = (state, payload) => {
  // console.log(payload)
  let newState = {
    ...state,
    successMessage: 'Success'
  }
  return newState
}

const resetErrorMessage = (state, payload) => {
  let newState = {
    ...state,
    errorMessage: ''
  }
  return newState
}

const resetSuccessMessage = (state, payload) => {
  let newState = {
    ...state,
    successMessage: ''
  }
  return newState
}

const expenseReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case ActionTypes.ADD_EXPENSE: return addExpense(state, payload)
    case 'ADD_EXPENSE_SUCCESS': return addExpenseSuccess(state, payload)
    case 'ADD_EXPENSE_FAIL': return addExpenseFail(state, payload)
    case 'RESET_ERROR_MESSAGE': return resetErrorMessage(state, payload)
    case 'RESET_SUCCESS_MESSAGE': return resetSuccessMessage(state, payload)
    case ActionTypes.GET_EXPENSE_AMOUNT_BY_MOUNT: return payload
    case ActionTypes.GET_EXPENSE_BY_ID: return payload
    case ActionTypes.GET_EXPENSE: return (state, payload)
    default: return state;
  }
}

export default expenseReducer;
