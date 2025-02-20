import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an action to update the profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const userId = await AsyncStorage.getItem('user_id'); // Get user ID from AsyncStorage

      if (!userId) throw new Error('User ID not found in AsyncStorage');

      const response = await fetch('https://zeewebvalley.com/quizup/super-admin/api/Controll/profile_update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: profileData.name,
          user_phone: profileData.phone,
          user_email: profileData.email,
          user_dob: profileData.dateofbirth,
          user_id: userId,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        return result;
      } else {
        return rejectWithValue(result);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
