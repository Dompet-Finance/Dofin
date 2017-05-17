import * as ActionTypes from '../actions/constants';

const initialState = {
  errorMessage: '',
  successMessage: '',
  data: {
    totalByCategoryThisYear: [],
    incomeById: [],
  },
}

const getTotalByCategoryThisYear = (state, payload) => {
  let newState = {
    ...state,
    data: {
      ...state.data,
      totalByCategoryThisYear: payload
    }
  }
  return newState
}

const getIncomeById = (state, payload) => {
  let newState = {
    ...state,
    data: {
      ...state.data,
      incomeById: payload
    }
  }
  return newState
}

const deleteIncomeById = (state, payload) => {
  let newPayload = state.data.incomeById.filter(val =>
    val._id !== payload._id
  )
  let newState = {
    ...state,
    data: {
      ...state.data,
      incomeById: newPayload
    }
  }
  return newState
}

const incomeReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case ActionTypes.NEW_INCOME: return state
    case 'GET_INCOME_BY_ID': return getIncomeById(state, payload)
    case 'GET_INCOME_AMOUNT_BY_CATEGORY_THIS_YEAR': return getTotalByCategoryThisYear(state, payload)
    case 'DELETE_INCOME_BY_ID': return deleteIncomeById(state, payload)
    default: return state;
  }
}

export default incomeReducer;
