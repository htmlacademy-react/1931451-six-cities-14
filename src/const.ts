export const MAX_RATING = 5;
export const MAX_PERCENT = 100;
export const PRIVATE_ROUTES: readonly string[] = ['/favorites'];
export const CITY_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export const DEFAULT_CITY_NAME = CITY_NAMES[0];

export const OffersSortMap = {
  Popular: 'Popular',
  LowPrice: 'Price: low to high',
  HighPrice: 'Price: high to low',
  TopRated: 'Top rated first'
};

export enum NameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Favorites = 'FAVORITES',
  Reviews = 'REVIEWS',
  User = 'USER',
  NearPlaces = 'NEAR_PLACES'
}
