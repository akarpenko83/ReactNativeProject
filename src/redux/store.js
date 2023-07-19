import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { authSlice } from './auth/authSlice';
import { postsSlice } from './posts/postsSlice';
import { commentsSlice } from './comments/commentsSlice';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(
      authPersistConfig,
      authSlice.reducer,
    ),
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);
