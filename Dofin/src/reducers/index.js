import { combineReducers } from 'redux';
import incomeReducer from './incomeReducer';

const rootReducer = combineReducers({
  income: incomeReducer,
})

export default rootReducer;
