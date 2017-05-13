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

export const getExpense = data => ({
  type: ActionTypes.GET_EXPENSE,
  payload: data[0].total_amount,
});

export const expenseRequest = data => {
  return dispatch =>
    axios.post('http://192.168.1.34:8080/expense', {
      record_by   : "59158e804412792833f91138",
      amount      : data.amount,
      description : data.description
      items       : data.items,
      category    : data.category,
      date        : new Date(),
      location    : data.location,
    })
    .then(response => dispatch(postExpense(response.data)))
    .catch(err => console.log(err.message))
};

export const getExpenseRequest = () => {
  return dispatch =>
    axios.get('http://192.168.1.34:8080/expense/59158e804412792833f91138/total_amount')
    .then(response => dispatch(getIncome(response.data)))
    .catch(err => console.log(err.message))
};