import ReviewsItem from '../../pages/offer-screen/reviews-item/reviews-item';
import { ReviewType } from '../../types';
import { useAuthorizationStatus } from '../../context/authorization-status';
import ReviewsForm from '../reviews-form/reviews-form';
import { checkAuthorizationStatus } from '../../utils/utils';

type ReviewsListProps = {
  reviews: ReviewType[];
}

export default function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const { authorizationStatus } = useAuthorizationStatus();
  const isLogged = checkAuthorizationStatus(authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewsItem review={review} key={review.id} />
        ))}
      </ul>
      {isLogged && <ReviewsForm />}
    </section>
  );
}
