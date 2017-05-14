import * as ActionTypes from './constants';
import axios from 'axios'

export const postIncome = data => ({
  type: ActionTypes.NEW_INCOME,
  payload: data,
});

export const getIncome = data => ({
  type: ActionTypes.GET_INCOME,
  payload: data[0].total_amount,
});

export const incomeRequest = data => {
  return dispatch =>
    axios.post('http://192.168.0.209:8080/income', {
      record_by   : "59158e804412792833f91138",
      amount      : data.amount,
      description : data.description,
      category    : data.category_income,
      date        : new Date()
    })
    .then(response => dispatch(postIncome(response.data)))
    .catch(err => console.log(err.message))
};

export const getIncomeRequest = () => {
  return dispatch =>
    axios.get('http://192.168.0.145:8080/income/59158e804412792833f91138/total_amount')
    .then(response => dispatch(getIncome(response.data)))
    .catch(err => console.log(err.message))
};
