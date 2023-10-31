import classNames from 'classnames';
import { CITY_NAMES } from '../../const';
import { CityNamesType } from '../../types';
import styles from './locations-tabs.module.css';

type LocationsTabsProps = {
  activeCity: CityNamesType;
  onActiveCity: (city: CityNamesType) => void;
};

export default function LocationsTabs({
  activeCity,
  onActiveCity
}: LocationsTabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITY_NAMES.map((city) => (
            <li className="locations__item" key={city}>
              <button
                className={classNames(`locations__item-link tabs__item ${styles.resetStyleButton}`, {
                  'tabs__item--active': activeCity === city,
                })}
                onClick={() => onActiveCity(city)}
              >
                <span>{city}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
