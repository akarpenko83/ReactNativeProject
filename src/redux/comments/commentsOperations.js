import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../config';

const getComments = createAsyncThunk(
  'comments/getComments',
  async (postId, thunkAPI) => {
    try {
      const snapshot = await getDocs(
        collection(db, `comments-${postId}`),
      );
      const result = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const addComment = createAsyncThunk(
  'comments/addComment',

  async (newComment, thunkAPI) => {
    try {
      const docRef = await addDoc(
        collection(db, `comments-${newComment.postId}`),
        newComment,
      );

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const commentsOperations = {
  getComments,
  addComment,
};
