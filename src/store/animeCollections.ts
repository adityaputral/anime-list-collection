import { createSlice, current } from '@reduxjs/toolkit';

import {
  IAnimeDetailData,
  IAnimeCollectionsState,
  IAnimeCollection,
  IAnimeCollectionsInitialState
} from './animeCollections';

export const animeCollectionSlice = createSlice({
  name: 'animeCollections',
  initialState: {
    collections: []
  },
  reducers: {
    addCollection: (
      state: IAnimeCollectionsInitialState,
      action: {
        payload: IAnimeDetailData;
      }
    ) => {
      const payload = action.payload;
      state.collections.push(payload);
    },
    removeCollection: (
      state: IAnimeCollectionsInitialState,
      action: {
        payload: string;
      }
    ) => {
      const payload = action.payload;
      const foundCollectionIndex = state.collections.findIndex(
        (collection: IAnimeCollection) => collection.id === payload
      );

      if (foundCollectionIndex > -1)
        state.collections.splice(foundCollectionIndex, 1);
    },
    editCollection: (
      state: IAnimeCollectionsInitialState,
      action: {
        payload: { collectionId: string | number; name: string };
      }
    ) => {
      const payload = action.payload;
      const foundCollectionIndex = state.collections.findIndex(
        (collection: IAnimeCollection) => collection.id === payload.collectionId
      );

      if (foundCollectionIndex > -1)
        state.collections[foundCollectionIndex].name = payload.name;
    },
    addAnime: (
      state: IAnimeCollectionsInitialState,
      action: {
        payload: {
          animeDetail: IAnimeDetailData;
          collectionId: string | number;
        };
      }
    ) => {
      const payload = action.payload;
      const foundCollectionIndex = state.collections.findIndex(
        (collection: IAnimeCollection) => collection.id === payload.collectionId
      );

      if (foundCollectionIndex > -1) {
        state.collections[foundCollectionIndex].animeList.push(
          payload.animeDetail
        );
      }
    },
    removeAnime: (
      state: IAnimeCollectionsInitialState,
      action: {
        payload: { animeId: string; collectionId: string | number };
      }
    ) => {
      const payload = action.payload;
      const foundCollectionIndex = state.collections.findIndex(
        (collection: IAnimeCollection) => collection.id === payload.collectionId
      );

      if (foundCollectionIndex > -1) {
        const animeListUnderTheCollection =
          state.collections[foundCollectionIndex].animeList;
        const foundAnimeIndex = animeListUnderTheCollection.findIndex(
          (animeItem: IAnimeDetailData) => animeItem.id === payload.animeId
        );

        if (foundAnimeIndex > -1) {
          state.collections[foundCollectionIndex].animeList.splice(
            foundAnimeIndex,
            1
          );
        }
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addAnime,
  removeAnime,
  addCollection,
  removeCollection,
  editCollection
} = animeCollectionSlice.actions;

export default animeCollectionSlice.reducer;
