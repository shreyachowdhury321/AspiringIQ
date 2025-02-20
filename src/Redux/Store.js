import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './Reducer/AuthReducer'; // Note the capitalization of 'Reducer'
// import subjectReducer from './Reducer/SubjectReducer';
// import questionsReducer from './Reducer/QuestionReducer';
import profileReducer from './Reducer/ProfileReducer';
export default configureStore({
  reducer: {
    authReducer: authReducer,
    //  questionsReducer:questionsReducer,
     profileReducer:profileReducer
  },
});
