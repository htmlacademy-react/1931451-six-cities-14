import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { ReviewFormType } from './reviews-form.type';
import { MAX_RATING } from '../../../const';
import {
  MIN_LENGTH_COMMENT,
  RATING_NOT_SELECTED,
  ratings,
} from './reviews-form.const';

export default function ReviewsForm(): JSX.Element {
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormType>({
    comment: '',
    rating: RATING_NOT_SELECTED,
  });
  const isEnabled =
    reviewForm.comment.trim().length >= MIN_LENGTH_COMMENT &&
    reviewForm.rating !== RATING_NOT_SELECTED;

  const resetForm = () => {
    setReviewForm({ comment: '', rating: RATING_NOT_SELECTED });
    setIsFormDisabled(false);
  };

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value =
      target.name === 'rating' ? Number(target.value) : target.value;

    setReviewForm((prevState) => ({
      ...prevState,
      [target.name]: value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isEnabled) {
      return;
    }

    setIsFormDisabled(true);

    // FIXME: Удалить setTimeout
    setTimeout(() => {
      resetForm();
    }, 1500);
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
                name="rating"
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
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewForm.comment}
        onChange={handleChange}
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isEnabled}
        >
          {isFormDisabled ? 'Send' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
