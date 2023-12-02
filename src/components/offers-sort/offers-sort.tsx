import classNames from 'classnames';
import { memo, useState } from 'react';
import styles from './offers-sort.module.css';
import { OffersSortMap, SORT_PARAM_NAME } from '../../const';
import { OffersSortMapType } from '../../types';
import { useSearchParams } from 'react-router-dom';

type OffersSortProps = {
  onSortType: (type: OffersSortMapType) => void;
};

function OffersSortComponent({ onSortType }: OffersSortProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = Object.keys(OffersSortMap).find(
    (key) => key === searchParams.get(SORT_PARAM_NAME)
  )
    ? searchParams.get(SORT_PARAM_NAME)
    : null;
  const [activeOption, setActiveOption] = useState(sortParam ?? OffersSortMap.Popular);

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={() => isOpened && setIsOpened(false)}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((prevState) => !prevState)}
      >
        {activeOption}
        <svg
          className={classNames(
            'places__sorting-arrow',
            styles.arrowTransition,
            {
              [styles.arrowAnimate]: isOpened,
            }
          )}
          width={7}
          height={4}
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={classNames('places__options places__options--custom', {
          'places__options--opened': isOpened,
        })}
      >
        {Object.entries(OffersSortMap).map(([type, value]) => (
          <li
            className={classNames('places__option', {
              'places__option--active': value === activeOption,
            })}
            tabIndex={0}
            key={value}
            onClick={() => {
              setActiveOption(value);
              setSearchParams((params) => {
                params.set(SORT_PARAM_NAME, type);
                return params;
              });
              onSortType(type as OffersSortMapType);
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

const OffersSort = memo(OffersSortComponent);
export default OffersSort;
