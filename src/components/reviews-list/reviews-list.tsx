import ReviewsItem from '../../pages/offer-screen/reviews-item/reviews-item';
import { OfferType, ReviewType } from '../../types';
import ReviewsForm from '../reviews-form/reviews-form';
import { checkAuthorizationStatus } from '../../utils/utils';
import { MAX_REVIEWS_COUNT, MIN_REVIEWS_COUNT } from './reviews-list.const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';

type ReviewsListProps = {
  reviews: ReviewType[];
  offerId?: OfferType['id'];
};

export default function ReviewsList({
  reviews,
  offerId,
}: ReviewsListProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const reviewSorted = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(MIN_REVIEWS_COUNT, MAX_REVIEWS_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewSorted.map((review) => (
          <ReviewsItem review={review} key={review.id} />
        ))}
      </ul>
      {isLogged && <ReviewsForm offerId={offerId} />}
    </section>
  );
}
