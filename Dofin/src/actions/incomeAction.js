import * as ActionTypes from './constants';
import axios from 'axios'
const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com'

function isError(data) {
  return data.hasOwnProperty('errors') ? true : false
}

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

export const incomeRequestFail = data => ({
  type: 'ADD_INCOME_FAIL',
  payload: data,
});


export const incomeRequestTotalByCategorySuccess = data => ({
  type: 'GET_INCOME_AMOUNT_BY_CATEGORY_THIS_YEAR',
  payload: data,
});

export const assignIncomeType = data => {
  return data.map(item => {
    let newItem = {
      ...item,
      total_amount: 0,
      total_amount_income: item.total_amount,
    }
    return newItem
  })
}

export const incomeRequestTotalByCategory = data => {
  return dispatch =>
    axios.get(host + `/income/${data.id}/total_amount_by_category`, { timeout: 7000 })
    .then(response => {
      // console.log(response.data)
      return isError(response.data) ?
        dispatch(incomeRequestFail(err)) :
        dispatch(incomeRequestTotalByCategorySuccess(response.data))
    })
    .catch(err => {
      // console.log(err)
      return dispatch(incomeRequestFail(err))
    })
};

export const getIncomeById = data => ({
  type: 'GET_INCOME_BY_ID',
  payload: data,
});

export const getIncomeRequestById = data => {
  return dispatch =>
    axios.get(host + `/income/${data.id}`)
    .then(response => dispatch(getIncomeById(response.data)))
    .catch(err => console.log(err.message))
};

export const deleteIncomeByIdSuccess = data => ({
  type: 'DELETE_INCOME_BY_ID',
  payload: data,
})

export const deleteIncomeById = (data) => {
  return dispatch =>
    axios.delete(host + `/income/${data.id}`)
    .then(response => {
      dispatch(deleteIncomeByIdSuccess(response.data))
    })
    .catch(err => console.log(err.message))
};