import { combineReducers } from 'redux';
import incomeReducer from './incomeReducer';
import dreamReducer from './dreamReducer';
import categoryReducer from './categoryReducer';
import expenseReducer from './expenseReducer';
import cameraReducer from './cameraReducer';
import placesReducers from './placesReducers';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  income  : incomeReducer,
  dream   : dreamReducer,
  category: categoryReducer,
  expense : expenseReducer,
  camera  : cameraReducer,
  places  : placesReducers,
  notification: notificationReducer
})

export default rootReducer;
