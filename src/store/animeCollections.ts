import { createSlice, current } from '@reduxjs/toolkit';

export const animeCollectionSlice = createSlice({
  name: 'animeCollections',
  initialState: {
    collections: []
  },
  reducers: {
    addCollection: (
      state,
      action: {
        payload: {
          id: string;
          name: string;
          animeList: [{ animeDetail: Record<string, any> }];
        };
      }
    ) => {
      const payload = action.payload;
      state.collections.push(payload);
    },
    removeCollection: (
      state,
      action: {
        payload: string;
      }
    ) => {
      const payload = action.payload;
      const foundCollectionIndex = state.collections.findIndex(
        (collection) => collection.id === payload
      );

      if (foundCollectionIndex > -1)
        state.collections.splice(foundCollectionIndex, 1);
    },
    editCollection: (
      state,
      action: {
        payload: { collectionId: string; name: string };
      }
    ) => {
      const payload = action.payload;
      const foundCollectionIndex = state.collections.findIndex(
        (collection) => collection.id === payload.collectionId
      );

      if (foundCollectionIndex > -1)
        state.collections[foundCollectionIndex].name = payload.name;
    },
    addAnime: (
      state,
      action: {
        payload: { animeDetail: Record<string, any>; collectionId: string };
      }
    ) => {
      const payload = action.payload;
      const foundCollectionIndex = state.collections.findIndex(
        (collection) => collection.id === payload.collectionId
      );

      if (foundCollectionIndex > -1) {
        state.collections[foundCollectionIndex].animeList.push(
          payload.animeDetail
        );
      }
    },
    removeAnime: (
      state,
      action: {
        payload: { animeId: string; collectionId: string };
      }
    ) => {
      const payload = action.payload;
      const foundCollectionIndex = state.collections.findIndex(
        (collection) => collection.id === payload.collectionId
      );

      if (foundCollectionIndex > -1) {
        const animeListUnderTheCollection =
          state.collections[foundCollectionIndex].animeList;
        const foundAnimeIndex = animeListUnderTheCollection.findIndex(
          (animeItem) => animeItem.id === payload.animeId
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
