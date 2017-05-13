import * as ActionTypes from './constants';
import axios from 'axios'

export const postIncome = data => ({
  type: ActionTypes.NEW_INCOME,
  payload: data,
});

export const getIncome = data => ({
  type: ActionTypes.GET_INCOME,
  payload: data,
});

export const incomeRequest = data => {
  return dispatch =>
    axios.post('http://192.168.0.209:3001/income', {
      nominal: data.nominal,
      category: data.category_income
    })
    .then(response => dispatch(postIncome(response.data)))
    .catch(err => console.log(err.message))
};

export const getIncomeRequest = () => {
  return dispatch =>
    axios.get('http://192.168.0.209:3001/income')
    .then(response => dispatch(getIncome(response.data.total)))
    .catch(err => console.log(err.message))
};
