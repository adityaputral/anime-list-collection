export interface AnimeListingResponse {
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
