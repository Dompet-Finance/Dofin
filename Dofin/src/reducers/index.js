import { combineReducers } from 'redux';
import incomeReducer from './incomeReducer';
import dreamReducer from './dreamReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  income  : incomeReducer,
  dream   : dreamReducer,
  category: categoryReducer
})

export default rootReducer;
