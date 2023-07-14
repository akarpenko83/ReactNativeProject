import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    console.log(email, password);
    try {
      const registerDB =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )
          .then(userCredential => {
            // Signed in
            console.log(userCredential.user);
            // ...
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });

      return registerDB;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const authOperations = {
  register,
};
