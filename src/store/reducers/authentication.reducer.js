import Cookies from 'universal-cookie';
import { userConstants } from '../../constants/user.constants';

const cookies = new Cookies();
const { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SESSION_FAILURE, SESSION_SUCCESS, SESSION_REQUEST } = userConstants;

// const user = JSON.parse(localStorage.getItem('user'));
const session = cookies.get('session');
// const session = { loggedIn: true };
const initialState = session ? { loggedIn: true } : {};

function authentication(state = initialState, action) {
  switch (action.type) {
    case SESSION_REQUEST:
      return state;
    case SESSION_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
      };
    case SESSION_FAILURE:
      return {};
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case LOGIN_SUCCESS:
      return { loggedIn: true, user: action.user };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export { authentication };
