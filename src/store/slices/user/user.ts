import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, UserType } from '../../../types';
import { NameSpace } from '../../../const';
import { checkAuthAction, loginAction, logoutAction } from '../../api-action';

type UserStateType = {
  authorizationStatus: AuthorizationStatus;
  user: UserType | null;
};

const initialState: UserStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserType | null>) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  },
});

export const { setUser } = userSlice.actions;
