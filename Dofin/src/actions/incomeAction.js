import * as ActionTypes from './constants';
import axios from 'axios'
const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com'

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
    axios.post(host+'/income', {
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
    axios.get(host+'/income/59158e804412792833f91138/total_amount')
    .then(response => dispatch(getIncome(response.data)))
    .catch(err => console.log(err.message))
};
