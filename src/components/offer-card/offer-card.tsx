import { memo } from 'react';
import classNames from 'classnames';
import { PreviewOfferType } from '../../types';
import {
  getPathToOffer,
  getPercentRating,
  setCapitalLetter,
} from '../../utils/utils';
import { Link } from 'react-router-dom';

type OfferCardProps = {
  offer: PreviewOfferType;
  onActiveOffer?: (offer: PreviewOfferType | null) => void;
  className?: string;
};

function OfferCard({
  offer,
  className,
  onActiveOffer
}: OfferCardProps): JSX.Element {
  const { isPremium, previewImage, price, rating, title, type, id } = offer;
  const path = getPathToOffer(id);

  return (
    <article
      className={classNames('place-card', className)}
      onMouseEnter={() => onActiveOffer?.(offer)}
      onMouseLeave={() => onActiveOffer?.(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={path}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={classNames('place-card__bookmark-button button', {
              'place-card__bookmark-button--active': offer.isFavorite,
            })}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getPercentRating(rating) }} />
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

const OfferCardMemo = memo(OfferCard);
export default OfferCardMemo;
