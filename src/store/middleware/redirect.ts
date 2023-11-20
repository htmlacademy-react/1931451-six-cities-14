import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import browserHistory from '../../browser-history';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (typeof action.type === redirectToRoute.toString()) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
