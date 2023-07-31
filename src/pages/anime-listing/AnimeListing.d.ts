export interface IAnimeListingResponse {
  Page: {
    media: {
      id: string | number;
      bannerImage: string;
      description: string;
      title: {
        english: string;
      };
    };
  };
}
