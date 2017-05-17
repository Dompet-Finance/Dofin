import {
  ADD_EXPENSE,
  GET_EXPENSE_AMOUNT_BY_MOUNT,
  GET_EXPENSE_BY_ID,
  GET_EXPENSE,
  GET_TOTAL_AMOUNT_YEAR_BY_ID
} from '../../actions/constants';
import expenseReducer from '../../reducers/expenseReducer';

describe('Expense Reducer', () => {
  it('should display initial state', () => {
    const action = { type: 'unknown'};
    const newState = expenseReducer(undefined, action)
    expect(newState).toEqual({
      errorMessage: '',
      successMessage: '',
      data: {
        totalByCategoryThisYear: [],
        expensesById: [],
      },
    })
  })

  it('ADD_EXPENSE action executeds', () => {
    const action = {
      type: ADD_EXPENSE,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = expenseReducer(undefined, action)
    expect(newState).toEqual({
      errorMessage: '',
      successMessage: '',
      data: {
        totalByCategoryThisYear: [],
        expensesById: [],
      },
    })
  })

  it('expense by id should be action payload', () => {
    const action = {
      type: GET_EXPENSE_AMOUNT_BY_MOUNT,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = expenseReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })

  it('expense by id should be action payload', () => {
    const action = {
      type: GET_EXPENSE_BY_ID,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = expenseReducer(undefined, action)
    expect(newState).toEqual({
      errorMessage: '',
      successMessage: '',
      data: {
        totalByCategoryThisYear: [],
        expensesById: action.payload,
      },
    })
  })

  it('should return action payload', () => {
    const action = {
      type: GET_EXPENSE,
      payload: {payloadKey: 'payloadVal'}
    };
    const newState = expenseReducer(undefined, action)
    expect(newState).toEqual(action.payload)
  })
})
