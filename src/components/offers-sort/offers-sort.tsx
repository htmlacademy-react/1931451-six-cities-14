import classNames from 'classnames';
import { memo, useState } from 'react';
import styles from './offers-sort.module.css';
import { OffersSortMap } from '../../const';
import { OffersSortMapType } from '../../types';

type OffersSortProps = {
  onSortType: (type: OffersSortMapType) => void;
};

function OffersSort({ onSortType }: OffersSortProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const [activeOption, setActiveOption] = useState(OffersSortMap.Popular);

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

const OffersSortMemo = memo(OffersSort);
export default OffersSortMemo;
