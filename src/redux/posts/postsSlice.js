import { createSlice } from '@reduxjs/toolkit';
import { postsOperations } from './postsOperations';

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: {
    [postsOperations.getPosts.pending](state) {
      state.isLoading = true;
    },
    [postsOperations.getPosts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    },
    [postsOperations.getPosts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [postsOperations.addPost.fulfilled](state, action) {
      state.isLoading = false;
    },
    [postsOperations.addPost.pending](state) {
      state.isLoading = true;
    },
    [postsOperations.addPost.rejected](state, action) {
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
const selectPosts = state => state.posts.posts;
const selectIsLoading = state => state.isLoading;

export const postsSelectors = {
  selectPosts,
  selectIsLoading,
};
