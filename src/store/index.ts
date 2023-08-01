import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import storage from 'redux-persist/lib/storage';
import animeCollectionsReducer from './animeCollections';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: hardSet
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
