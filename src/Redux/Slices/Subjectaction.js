import AsyncStorage from '@react-native-async-storage/async-storage';

// Action Types
export const FETCH_SUBJECTS_REQUEST = 'FETCH_SUBJECTS_REQUEST';
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS';
export const FETCH_SUBJECTS_FAILURE = 'FETCH_SUBJECTS_FAILURE';

// Action Creators
export const fetchSubjectsRequest = () => ({
  type: FETCH_SUBJECTS_REQUEST,
});

export const fetchSubjectsSuccess = subjects => ({
  type: FETCH_SUBJECTS_SUCCESS,
  payload: subjects,
});

export const fetchSubjectsFailure = error => ({
  type: FETCH_SUBJECTS_FAILURE,
  payload: error,
});

// Thunk for fetching subjects from API
export const fetchSubjects = () => {
  return async dispatch => {
    dispatch(fetchSubjectsRequest());

    const url = 'https://zeewebvalley.com/quizup/super-admin/api/Controll/subject/';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        'Cookie': 'ci_session=86fa9bc0b9134664bac4a015162b56aae9a81e44',
      },
      body: "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; ------WebKitFormBoundary7MA4YWxkTrZu0gW--",
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (response.ok) {
        // Save to AsyncStorage
        await AsyncStorage.setItem('subjects', JSON.stringify(result));

        // Dispatch success action
        dispatch(fetchSubjectsSuccess(result));
      } else {
        // Handle API error
        dispatch(fetchSubjectsFailure('Failed to fetch subjects'));
      }
    } catch (error) {
      dispatch(fetchSubjectsFailure(error.message));
    }
  };
};
