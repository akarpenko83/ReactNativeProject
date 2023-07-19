import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../config';

const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (currentUserUid, thunkAPI) => {
    try {
      const snapshot = await getDocs(
        collection(db, `posts-${currentUserUid}`),
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
const addPost = createAsyncThunk(
  'posts/addPost',

  async (newPost, thunkAPI) => {
    try {
      const docRef = await addDoc(
        collection(db, `posts-${newPost.currentUserUid}`),
        newPost,
      );

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const removePost = createAsyncThunk(
  'posts/removePost',
  async (contactId, thunkAPI) => {
    try {
      //   const response = await axios.delete(
      //     `/contacts/${contactId}`,
      //   );
      //   return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const postsOperations = {
  getPosts,
  addPost,
  removePost,
};
