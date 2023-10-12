import { CityType } from './city.type';
import { LocationType } from './location.type';
import { UserType } from './user.type';

export type OfferType = {
  city: CityType;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: UserType;
  description: string;
  location: LocationType;
  id: number;
}
