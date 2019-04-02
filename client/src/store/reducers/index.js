import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import brandStyleReducer from './brandStyleReducer';
import bottleSizeReducer from './bottleSizeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  brandStyle: brandStyleReducer,
  bottleSize: bottleSizeReducer
});