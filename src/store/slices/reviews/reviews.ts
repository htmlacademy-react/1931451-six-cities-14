import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { ReviewType } from '../../../types';
import { fetchAddReviewAction, fetchReviewsAction } from '../../api-action';

type ReviewsStateType = {
  reviews: ReviewType[];
  isReviewSending: boolean;
  isReviewAddedSuccess: boolean;
}

const initialState: ReviewsStateType = {
  reviews: [],
  isReviewSending: false,
  isReviewAddedSuccess: false
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
        state.isReviewAddedSuccess = false;
        state.isReviewSending = true;
      })
      .addCase(fetchAddReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isReviewAddedSuccess = true;
        state.isReviewSending = false;
      })
      .addCase(fetchAddReviewAction.rejected, (state) => {
        state.isReviewAddedSuccess = false;
        state.isReviewSending = false;
      });
  }
});

export const { dropReviews } = reviewsSlice.actions;
