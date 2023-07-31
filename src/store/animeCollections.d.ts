export interface IAnimeDetailData {
  id: string | number;
  bannerImage: string;
  description: string;
  season: string;
  genres: string;
  title: {
    english: string;
    native: string;
  };
}

export interface IAnimeCollection {
  id: string;
  name: string;
  animeList: IAnimeDetailData;
}

export type AnimeCollections = IAnimeCollection[];

export interface IAnimeCollectionsState {
  animeCollections: {
    collections: AnimeCollections;
  };
}
