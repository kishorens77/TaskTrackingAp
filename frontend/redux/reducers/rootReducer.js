import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
// Import other reducers here

const rootReducer = combineReducers({
  login: loginReducer,
  // Add other reducers here
});

export default rootReducer;
