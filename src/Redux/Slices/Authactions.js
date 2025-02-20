import AsyncStorage from '@react-native-async-storage/async-storage';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action Creators
export const loginUserAction = (loginData) => {
  return async (dispatch) => {
    try {
      // API call to login
      const response = await fetch('https://zeewebvalley.com/quizup/super-admin/api/Controll/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to asyncStorage
        await AsyncStorage.setItem('userToken', data.token);

        // Dispatch success action
        dispatch({type: LOGIN_SUCCESS, payload: data.token});
      } else {
        dispatch({type: LOGIN_FAILURE, payload: data.error});
        Alert.alert('Login Failed', data.error);
      }
    } catch (error) {
      dispatch({type: LOGIN_FAILURE, payload: error.message});
      Alert.alert('Error', error.message);
    }
  };
};  


