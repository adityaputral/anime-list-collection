export interface ICardData {
  bannerImage: string;
  description: string;
  title: {
    english: string;
  };
}

export interface ICardProps {
  items: ICardData[];
  deleteFn: () => void;
}
