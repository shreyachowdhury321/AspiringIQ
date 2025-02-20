// services/apiService.js
import axios from 'axios';

export const loginApi = async (loginData) => {
  try {
    const response = await axios.post('https://your-api-url.com/login', loginData);
    return response.data;
  } catch (error) {
    throw error; // Rethrow error to be caught in Redux action
  }
};
