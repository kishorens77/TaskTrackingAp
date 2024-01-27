import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/loginActions';

const initialState = {
  loading: false,
  userData: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  console.log("action",action)
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("STATE = ",state)
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      console.log("STATE 2= ",state)
      return { ...state, loading: false, userData: action.payload, error: null };
    case LOGIN_FAILURE:
      console.log("STATE 3= ",state)
      return { ...state, loading: false, userData: null, error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
