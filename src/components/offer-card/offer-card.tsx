import { memo, useState } from 'react';
import classNames from 'classnames';
import { PreviewOfferType } from '../../types';
import {
  debounce,
  getPathToOffer,
  getPercentRating,
  setCapitalLetter,
} from '../../utils/utils';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchChangeFavoriteStatusAction } from '../../store/api-action';

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

function OfferCard({
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
  const [isBookmarkActive, setBookmarkActive] = useState(isFavorite);
  const dispatch = useAppDispatch();
  const path = getPathToOffer(id);

  const handleBookmarkButtonClick = debounce(() => {
    dispatch(
      fetchChangeFavoriteStatusAction({
        offerId: id,
        status: Number(!isBookmarkActive),
      })
    );

    setBookmarkActive((prev) => !prev);
  });

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
          <button
            className={classNames('place-card__bookmark-button button', {
              'place-card__bookmark-button--active': isBookmarkActive,
            })}
            type="button"
            onClick={handleBookmarkButtonClick}
            onMouseOut={(evt) => evt.currentTarget.blur()}
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
