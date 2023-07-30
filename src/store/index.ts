import { configureStore } from '@reduxjs/toolkit';
import {
  autoRehydrate,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import animeCollectionsReducer from './animeCollections';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

export default configureStore({
  reducer: {
    animeCollections: persistReducer(persistConfig, animeCollectionsReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
