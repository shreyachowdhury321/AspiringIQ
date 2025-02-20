// import {
//     FETCH_SUBJECTS_REQUEST,
//     FETCH_SUBJECTS_SUCCESS,
//     FETCH_SUBJECTS_FAILURE,
//   } from '../Slices/Subjectaction';
  
//   const initialState = {
//     loading: false,
//     subjects: [],
//     error: '',
//   };
  
//   const subjectReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case FETCH_SUBJECTS_REQUEST:
//         return {
//           ...state,
//           loading: true,
//         };
//       case FETCH_SUBJECTS_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           subjects: action.payload,
//           error: '',
//         };
//       case FETCH_SUBJECTS_FAILURE:
//         return {
//           ...state,
//           loading: false,
//           subjects: [],
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default subjectReducer;
  


const subjectReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case FETCH_SUBJECTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SUBJECTS_SUCCESS:
        return {
          ...state,
          loading: false,
          subjects: action.payload,
          error: '',
        };
      case FETCH_SUBJECTS_FAILURE:
        return {
          ...state,
          loading: false,
          subjects: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  