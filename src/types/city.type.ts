import { CityName } from './city-name.enum';
import { LocationType } from './location.type';

export type CityType = {
  name: keyof typeof CityName;
  location: LocationType;
}
