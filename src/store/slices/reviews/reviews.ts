import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { ReviewType } from '../../../types';
import { fetchAddReviewAction, fetchReviewsAction } from '../../api-action';

type ReviewsStateType = {
  reviews: ReviewType[];
  isSendReview: boolean;
  isReviewAdded: boolean;
}

const initialState: ReviewsStateType = {
  reviews: [],
  isSendReview: false,
  isReviewAdded: false
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    dropReviews: (state) => {
      state.reviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchAddReviewAction.pending, (state) => {
        state.isSendReview = true;
      })
      .addCase(fetchAddReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isReviewAdded = true;
        state.isSendReview = false;

      })
      .addCase(fetchAddReviewAction.rejected, (state) => {
        state.isReviewAdded = false;
        state.isSendReview = false;
      });
  }
});

export const { dropReviews } = reviewsSlice.actions;
