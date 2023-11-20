import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { ReviewType } from '../../../types';
import { fetchAddReviewAction, fetchReviewsAction } from '../../api-action';

type ReviewsStateType = {
  reviews: ReviewType[];
}

const initialState: ReviewsStateType = {
  reviews: [],
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
      .addCase(fetchAddReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  }
});

export const { dropReviews } = reviewsSlice.actions;
