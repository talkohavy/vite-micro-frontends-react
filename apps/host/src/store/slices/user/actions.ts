import { createAction } from '@reduxjs/toolkit';
import { createActionString } from '../../helpers';

const prefix = 'user';

const SET_IS_LOGGED_IN = createActionString({ prefix, actionString: 'Set is logged in' });
const ENTER_LOGIN_MODE = createActionString({ prefix, actionString: 'Enter login mode' });

const login = createAction(ENTER_LOGIN_MODE, (payload) => ({ payload }));
const setIsLoggedIn = createAction(
  SET_IS_LOGGED_IN,
  /** @param {{isLogged: boolean}} payload */
  (payload) => ({ payload }),
);

export { ENTER_LOGIN_MODE, login, prefix, setIsLoggedIn };
