import { combineReducers } from 'redux';
import incomeReducer from './incomeReducer';
import dreamReducer from './dreamReducer';

const rootReducer = combineReducers({
  income: incomeReducer,
  dream: dreamReducer,
})

export default rootReducer;
