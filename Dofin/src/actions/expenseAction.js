import * as ActionTypes from './constants';
import axios from 'axios'

export const postImage = newExpense => ({
  type: ADD_EXPENSE,
  payload: newExpense,
});

export const postExpense = data => ({
  type: ActionTypes.ADD_EXPENSE,
  payload: data,
});

export const getTotalExpenseAmountByMonth = data => ({
  type: ActionTypes.GET_EXPENSE_AMOUNT_BY_MOUNT,
  payload: data,
});

export const getExpenseById = data => ({
  type: ActionTypes.GET_EXPENSE_BY_ID,
  payload: data,
});

export const expenseRequest = data => {
  return dispatch =>
    axios.post('http://192.168.0.209:8080/expenses', {
      record_by   : "59158e804412792833f91138",
      amount      : data.amount,
      description : data.description,
      items       : data.items,
      category    : data.category,
      date        : new Date(),
      location    : data.location,
    })
    .then(response => dispatch(postExpense(response.data)))
    .catch(err => console.log(err.message))
};

export const getExpenseTotalByMonthRequest = () => {
  return dispatch =>
    axios.get('http://192.168.0.209:8080/expenses/59169da29a208a785ad2e99c/total_amount_by_month')
    .then(response => dispatch(getTotalExpenseAmountByMonth(response.data)))
    .catch(err => console.log(err.message))
};

export const getExpenseRequestById = () => {
  return dispatch =>
    axios.get('http://192.168.0.209:8080/expenses/59169da29a208a785ad2e99c')
    .then(response => dispatch(getExpenseById(response.data)))
    .catch(err => console.log(err.message))
};
