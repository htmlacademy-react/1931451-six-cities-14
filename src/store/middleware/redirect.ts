import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';
import { redirectToRoute } from '../action';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof reducer>

export const redirect: Middleware<Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (typeof action.type === redirectToRoute.toString()) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
