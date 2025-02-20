import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Action types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

// Action to register a user
export const registerUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const form = new FormData();
  form.append('Name', formData.fullName);
  form.append('mobile', formData.phoneNumber);
  form.append('Board', formData.board);
  form.append('c_name', formData.selectedClass);
  form.append('Stream', formData.stream);
  form.append('email_id', formData.email);
  form.append('password', formData.password);
  form.append('confirmPassword',formData.confirmPassword)

  try {
    const res = await axios.post('', form, config);

    // Save token to AsyncStorage if needed
    await AsyncStorage.setItem('token', res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response ? err.response.data : 'Registration failed',
    });
  }
};
