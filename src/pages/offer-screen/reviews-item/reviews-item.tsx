import { useRef } from 'react';
import { ReviewType } from '../../../types';
import { getPercentRating } from '../../../utils/utils';
import { SUBSTRING_END, SUBSTRING_START } from '../offer-screen.const';

type ReviewsItemProps = {
  review: ReviewType;
};

export default function ReviewsItem({ review }: ReviewsItemProps): JSX.Element {
  const { rating, comment, date } = review;
  const { avatarUrl, name } = review.user;
  const dateRef = useRef(new Date(date)).current;
  // FIXME: formatDate
  // const reviewDateRef = useRef(formatDate(dateRef)).current;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width={54}
            height={54}
            alt={name}
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getPercentRating(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time
          className="reviews__time"
          dateTime={dateRef
            .toISOString()
            .substring(SUBSTRING_START, SUBSTRING_END)}
        >
          {dateRef.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}
        </time>
      </div>
    </li>
  );
}
