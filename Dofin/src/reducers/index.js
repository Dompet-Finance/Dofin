import { combineReducers } from 'redux';
import cameraReducer from './cameraReducer';

const rootReducer = combineReducers({
  cameras: cameraReducer,
})

export default rootReducer;
