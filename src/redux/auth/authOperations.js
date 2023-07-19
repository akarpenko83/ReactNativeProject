import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { Alert } from 'react-native';

const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, username }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      return user;
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
      return;
    }
  },
);
const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      return user;
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
      return;
    }
  },
);
const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await signOut(auth);
    Alert.alert('You have been logged out');
    return;
  } catch (error) {
    console.log(error);
    Alert.alert(error.message);
    return;
  }
});

export const authOperations = {
  register,
  login,
  logout,
};
