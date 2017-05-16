import { combineReducers } from 'redux';
import incomeReducer from './incomeReducer';
import dreamReducer from './dreamReducer';
import categoryReducer from './categoryReducer';
import expenseReducer from './expenseReducer';
import cameraReducer from './cameraReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  income  : incomeReducer,
  dream   : dreamReducer,
  category: categoryReducer,
  expense : expenseReducer,
  camera  : cameraReducer,
  user    : userReducer
})

export default rootReducer;
