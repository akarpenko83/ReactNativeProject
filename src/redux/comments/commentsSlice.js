import { createSlice } from '@reduxjs/toolkit';
import { commentsOperations } from './commentsOperations';

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: {
    [commentsOperations.getComments.pending](state) {
      state.isLoading = true;
    },
    [commentsOperations.getComments.fulfilled](
      state,
      action,
    ) {
      state.isLoading = false;
      state.error = null;
      state.comments = action.payload;
    },
    [commentsOperations.getComments.rejected](
      state,
      action,
    ) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [commentsOperations.addComment.fulfilled](
      state,
      action,
    ) {
      state.isLoading = false;
    },
    [commentsOperations.addComment.pending](state) {
      state.isLoading = true;
    },
    [commentsOperations.addComment.rejected](
      state,
      action,
    ) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // [postsOperations.removePost.fulfilled](state, action) {
    //   const index = state.posts.findIndex(
    //     contact => contact.id === action.payload.id,
    //   );
    //   state.contacts.splice(index, 1);
    // },
    // [postsOperations.removePost.pending](state) {
    //   state.isLoading = true;
    // },
    // [postsOperations.removePost.rejected](state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});
const selectComments = state => state.comments.comments;
const selectIsLoading = state => state.isLoading;

export const commentsSelectors = {
  selectComments,
  selectIsLoading,
};
