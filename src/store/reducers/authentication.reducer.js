import Cookies from 'universal-cookie';
import { userConstants } from '../../constants/user.constants';

const cookies = new Cookies();
const { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SESSION_FAILURE, SESSION_SUCCESS, SESSION_REQUEST } = userConstants;
const user = cookies.get('user');
const initialState = user ? {loggedIn: true, ...user} : {};


function authentication(state = initialState, action) {
  switch (action.type) {
    case SESSION_REQUEST:
      return state;
    case SESSION_SUCCESS:
      return {
        ...state,
        ...action.user,
        loggedIn: true,
      };
    case SESSION_FAILURE:
      return {};
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case LOGIN_SUCCESS:
      return { loggedIn: true, ...action.user };
    case LOGIN_FAILURE:
      return { loggedIn: false, error: action.err};
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export { authentication };
