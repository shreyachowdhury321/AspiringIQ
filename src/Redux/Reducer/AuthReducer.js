// import {LOGIN_SUCCESS, LOGIN_FAILURE} from '../Slices/Authactions';

// const initialState = {
//   token: null,
//   error: null,
//   loading: false,
// };

// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         token: action.payload,
//         error: null,
//       };
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         token: null,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };  

// export const loginUserAction = (loginData) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: 'LOGIN_REQUEST' });
      
//       // Your login API call logic here (example using fetch or axios)
//       const response = await yourApiService.login(loginData);
//       if (response.success) {
//         dispatch({ type: 'LOGIN_SUCCESS', payload: response.token });
//       } else {
//         dispatch({ type: 'LOGIN_FAILURE', error: response.error });
//       }
//     } catch (error) {
//       dispatch({ type: 'LOGIN_FAILURE', error });
//     }
//   };
// };


// Redux/Reducer/AuthReducer.js
import {loginApi} from '../API/Loginapi'; // Import API function

// Action Types
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action Creator
export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST }); // Dispatch login request action
  try {
    const response = await loginApi(loginData); // Call the API
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.token, // Store token in the payload
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message || 'Something went wrong', // Serialize the error
    });
  }
};

// Initial State
const initialState = {
  loading: false,
  error: null,
  token: null,
};

// Reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Store the error message
      };
    default:
      return state;
  }
};
