import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { MAX_RATING } from '../../const';
import {
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  RATING_NOT_SELECTED,
  ReviewFormFields,
  ratings,
} from './reviews-form.const';
import { OfferType } from '../../types';
import { useAppDispatch } from '../../hooks';
import { fetchAddReviewAction } from '../../store/api-action';

type ReviewsFormProps = {
  offerId?: OfferType['id'];
};

export default function ReviewsForm({
  offerId,
}: ReviewsFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    [ReviewFormFields.Comment]: '',
    [ReviewFormFields.Rating]: RATING_NOT_SELECTED,
  });
  const isValid =
    reviewForm.comment.replace(/\s/g, ' ').trim().length >=
      MIN_COMMENT_LENGTH &&
    reviewForm.comment.replace(/\s/g, ' ').trim().length <=
      MAX_COMMENT_LENGTH &&
    reviewForm.rating !== RATING_NOT_SELECTED;

  const resetForm = () => {
    setReviewForm({ comment: '', rating: RATING_NOT_SELECTED });
    setIsFormDisabled(false);
  };

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value =
      target.name === ReviewFormFields.Rating
        ? Number(target.value)
        : target.value;

    setReviewForm((prevState) => ({
      ...prevState,
      [target.name]: value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValid) {
      return;
    }

    setIsFormDisabled(true);

    if (offerId) {
      dispatch(fetchAddReviewAction([offerId, reviewForm]));
    }

    resetForm();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: MAX_RATING }, (_value, index) => ++index)
          .reverse()
          .map((item) => (
            <Fragment key={item}>
              <input
                className="form__rating-input visually-hidden"
                name={ReviewFormFields.Rating}
                value={item}
                id={`${item}-stars`}
                type="radio"
                onChange={handleChange}
                checked={reviewForm.rating === item}
                disabled={isFormDisabled}
              />
              <label
                htmlFor={`${item}-stars`}
                className="reviews__rating-label form__rating-label"
                title={ratings[item - 1]}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name={ReviewFormFields.Comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewForm.comment}
        onChange={handleChange}
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          {isFormDisabled ? 'Send' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
