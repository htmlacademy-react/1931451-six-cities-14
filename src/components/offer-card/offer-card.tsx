import { memo } from 'react';
import classNames from 'classnames';
import { PreviewOfferType } from '../../types';
import {
  getPathToOffer,
  getPercentRating,
  setCapitalLetter,
} from '../../utils/utils';
import { Link } from 'react-router-dom';
import ButtonFavorite from '../button-favorite/button-favorite';

type OfferCardType = 'favorites' | 'cities';

type OfferCardProps = {
  offer: PreviewOfferType;
  onActiveOffer?: (offer: PreviewOfferType | null) => void;
  className: OfferCardType;
};

const imageSizeMap: Record<OfferCardType, { width: string; height: string }> = {
  favorites: { width: '150', height: '110' },
  cities: { width: '260', height: '200' },
};

function OfferCardComponent({
  offer,
  onActiveOffer,
  className,
}: OfferCardProps): JSX.Element {
  const {
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
    id,
    isFavorite,
  } = offer;
  const path = getPathToOffer(id);

  return (
    <article
      className={classNames('place-card', `${className}__card`)}
      onMouseEnter={() => onActiveOffer?.(offer)}
      onMouseLeave={() => onActiveOffer?.(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${className}__image-wrapper`}>
        <Link to={path}>
          <img
            className="place-card__image"
            src={previewImage}
            alt={title}
            {...imageSizeMap[className]}
          />
        </Link>
      </div>
      <div className={`place-card__info ${className}-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <ButtonFavorite className='place-card' id={id} isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getPercentRating(rating) }} />\
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={path}>{title}</Link>
        </h2>
        <p className="place-card__type">{setCapitalLetter(type)}</p>
      </div>
    </article>
  );
}

const OfferCard = memo(OfferCardComponent);
export default OfferCard;
