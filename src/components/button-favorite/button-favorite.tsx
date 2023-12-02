import { useBookmarkToggle } from '../../hooks';
import { OfferType } from '../../types';

type ButtonFavoriteType = 'offer' | 'place-card';

type ButtonFavoriteProps = {
  className: ButtonFavoriteType;
  id: OfferType['id'];
  isFavorite: OfferType['isFavorite'];
};

const iconSizeMap: Record<
  ButtonFavoriteType,
  { width: string; height: string }
> = {
  ['place-card']: { width: '18', height: '19' },
  ['offer']: { width: '31', height: '33' },
};

export default function ButtonFavorite({
  className,
  id,
  isFavorite,
}: ButtonFavoriteProps): JSX.Element {
  const { handleBookmarkToggle, isBookmarkActive } = useBookmarkToggle(
    id,
    isFavorite
  );
  const bookmarkButtonClassName = `${className}__bookmark-button button ${isBookmarkActive ? `${className}__bookmark-button--active` : ''}`;

  return (
    <button
      className={bookmarkButtonClassName}
      type="button"
      onClick={handleBookmarkToggle}
      onMouseOut={(evt) => evt.currentTarget.blur()}
    >
      <svg className={`${className}__bookmark-icon`}
        {...iconSizeMap[className]}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
