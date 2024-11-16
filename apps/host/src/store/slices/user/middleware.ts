import { push } from 'redux-first-history';
import { createMiddleware } from '../../helpers';
import { login, prefix, setIsLoggedIn } from './actions';

export const userMiddleware = createMiddleware({
  uniquePrefix: prefix,
  // eslint-disable-next-line
  handleActionLogic: ({ action, dispatch, getState }) => {
    if (login.match(action)) {
      localStorage.setItem('isLogged', JSON.stringify(true));

      dispatch(setIsLoggedIn({ isLogged: true }));

      dispatch(push('/'));
    }
  },
});
