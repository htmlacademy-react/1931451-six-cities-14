import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import {
  addPluralEnding,
  getPercentRating,
  setCapitalLetter,
} from '../../utils/utils';
import { DEFAULT_BEGIN, MAX_IMAGES_SHOW } from './offer-screen.const';
import { Map } from '../../components/map/map';
import NearPlaces from '../../components/near-places/near-places';
import { Helmet } from 'react-helmet-async';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import { useEffect } from 'react';
import {
  fetchNearPlacesAction,
  fetchOfferAction,
  fetchReviewsAction,
} from '../../store/api-action';
import { getOffers } from '../../store/slices/offers/selectors';
import { getOffer, getOfferLoadingStatus } from '../../store/slices/offer/selectors';
import { getReviews } from '../../store/slices/reviews/selectors';
import { dropOffer } from '../../store/slices/offer/offer';
import { dropReviews } from '../../store/slices/reviews/reviews';
import { getNearPlaces } from '../../store/slices/near-places/selectors';
import { dropNearPlaces } from '../../store/slices/near-places/near-places';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function OfferScreen(): JSX.Element {
  const { offerId } = useParams();
  const offers = useAppSelector(getOffers);
  const offer = useAppSelector(getOffer);
  const isOfferLoading = useAppSelector(getOfferLoadingStatus);
  const reviews = useAppSelector(getReviews);
  const nearPlaces = useAppSelector(getNearPlaces);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!offerId) {
      return;
    }

    dispatch(fetchOfferAction(offerId));
    dispatch(fetchReviewsAction(offerId));
    dispatch(fetchNearPlacesAction(offerId));

    return () => {
      dispatch(dropOffer());
      dispatch(dropReviews());
      dispatch(dropNearPlaces());
    };
  }, [dispatch, offerId]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFoundScreen />;
  }

  const {
    images,
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    description,
  } = offer;

  const { avatarUrl, name, isPro } = offer.host;

  return (
    <div className="page">
      <Helmet>
        <title>6 Cities: {title}</title>
      </Helmet>

      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images
                .slice(DEFAULT_BEGIN, Math.min(MAX_IMAGES_SHOW, images.length))
                .map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img className="offer__image" src={image} alt={title} />
                  </div>
                ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: getPercentRating(rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {setCapitalLetter(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedroom{addPluralEnding(bedrooms)}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adult{addPluralEnding(maxAdults)}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{name}</span>
                  {isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <ReviewsList reviews={reviews} offerId={offerId} />
            </div>
          </div>
          <Map
            className="offer__map"
            offers={offers}
            isNeedZoom
            activeOffer={offer}
          />
        </section>
        <NearPlaces offers={nearPlaces} />
      </main>
    </div>
  );
}
