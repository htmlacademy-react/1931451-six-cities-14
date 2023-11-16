import { CityType } from './city.type';
import { LocationType } from './location.type';
import { UserShortType } from './user.type';

export type PreviewOfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type OfferType = PreviewOfferType & {
  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: UserShortType;
  description: string;
};
