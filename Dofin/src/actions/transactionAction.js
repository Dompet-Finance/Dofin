export const joinDetail = (income, expense) => {
  let incomeFetched = income !== undefined && income.data.incomeById.length
  let expenseFetched = expense !== undefined && expense.data.expensesById.length

  let incomeData = []
  let expenseData = []

  if (incomeFetched)
    incomeData = income.data.incomeById.map(val => {
      let data = {
        _id: val._id,
        amount: val.amount,
        description: val.description,
        category: val.category,
        date: val.date,
        totalItem: 0,
        type: 'income',
      }
      return data
    })

  if (expenseFetched)
    expenseData = expense.data.expensesById.map(val => {
      let data = {
        _id: val._id,
        amount: val.amount,
        description: val.description,
        category: val.category,
        date: val.date,
        totalItem: val.items.length,
        type: 'expense',
      }
      return data
    })

  return incomeData.concat(expenseData)

  // return incomeExpenses
  // {
  //   type: 'JOIN_DETAIL',
  //   payload: data,
  // }
}

// const initialState = {
//   errorMessage: '',
//   successMessage: '',
//   data: {
//     totalByCategoryThisYear: [],
//     expensesById: [],
//   },
// }

export const joinByCategory = (income, expense) => {
  let incomeFetched = income !== undefined && income.data.totalByCategoryThisYear.length
  let expenseFetched = expense !== undefined && expense.data.totalByCategoryThisYear.length
  // console.log(income, '11111111111111')
  let incomeExpenses = Array(12).fill().map((n, index) => {
    return {
      _id: {
        month: index + 1
      },
      total_amount: 0,
      total_amount_income: 0,
      total_amount_expense: 0,
      categories: []
    }
  })

  if (incomeFetched)
    incomeExpenses = incomeExpenses.map((val, index) => {
      let data = income.data.totalByCategoryThisYear.find(val => {
        return val._id.month === index + 1
      })
      if (data === undefined)
        return val
      data.categories = data.categories.map(category => {
        let newCategory = {
          ...category,
          type: 'income'
        }
        return newCategory
      })
      let newVal = {
        ...val,
        total_amount_income: data.total_amount,
        categories: [
          ...val.categories,
          ...data.categories,
        ]
      }
      return newVal
    })

  if (expenseFetched)
    incomeExpenses = incomeExpenses.map((val, index) => {
      let data = expense.data.totalByCategoryThisYear.find(val => {
        return val._id.month === index + 1
      })
      if (data === undefined)
        return val
      data.categories = data.categories.map(category => {
        let newCategory = {
          ...category,
          type: 'expense'
        }
        return newCategory
      })
      let newVal = {
        ...val,
        total_amount_expense: data.total_amount,
        categories: [
          ...val.categories,
          ...data.categories,
        ]
      }
      return newVal
    })

  return incomeExpenses

  // return {
  //   type: 'JOIN_BY_CATEGORY',
  //   payload: data,
  // }
};

export const joinByCategoryLastYears = data => ({
  type: 'JOIN_BY_CATEGORY_LAST_YEARS',
  payload: data,
});
