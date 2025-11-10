import { createReducer } from '@reduxjs/toolkit';
import { setIsLoggedIn } from './actions';

const INITIAL_STATE = {
  isLogged: false,
};

export const userReducer = createReducer(INITIAL_STATE, ({ addCase }) => {
  addCase(setIsLoggedIn, (state, action) => {
    state.isLogged = action.payload.isLogged;
  });
});
