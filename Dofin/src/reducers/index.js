import { combineReducers } from 'redux';
import incomeReducer from './incomeReducer';
import dreamReducer from './dreamReducer';
import categoryReducer from './categoryReducer';
import expenseReducer from './expenseReducer';
import cameraReducer from './cameraReducer';

const rootReducer = combineReducers({
  income  : incomeReducer,
  dream   : dreamReducer,
  category: categoryReducer,
  expense : expenseReducer,
  camera: cameraReducer
})

export default rootReducer;
