import Cookies from 'universal-cookie';
import { userConstants, urlConstants } from '../../constants';
const cookies = new Cookies();
const { HOME_URL } = urlConstants;

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

export function checkSession() {
  function request() { return { type: userConstants.SESSION_REQUEST }; }
  function success(user) { return { type: userConstants.SESSION_SUCCESS, user }; }
  function failure(err) { return { type: userConstants.SESSION_FAILURE, err }; }

  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json'},
  };

  return (dispatch) => {
    dispatch(request());
    fetch('/getuser', requestOptions)
      .then(handleResponse)
      .then((user) => {
        cookies.set('user', user);
        dispatch(success(user));
      })
      .catch((err) => {dispatch(failure(err));});
  };
}

export function login(email, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(err) { return { type: userConstants.LOGIN_FAILURE, err }; }

  return (dispatch) => {
    dispatch(request({ email }));
    const { LOGIN_URL } = urlConstants;

    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
    };
  
    fetch(LOGIN_URL, requestOptions)
      .then(handleResponse)
      .then((user) => {
                // TODO add history push myaccount
        dispatch(success(user));
        checkSession();
      })
      .catch((err) => {dispatch(failure(err));});
  };
}

export function logout() {
  cookies.remove('session');
  cookies.remove('user');
  return { type: userConstants.LOGOUT };
}

function register(user, history) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(err) { return { type: userConstants.REGISTER_FAILURE, err }; }

  return (dispatch) => {
    dispatch(request(user));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    fetch(urlConstants.REGISTER_URL, requestOptions)
      .then(handleResponse)
      .then((user)=> {
        dispatch(success(user));
        history.push('/');
      })
      .catch((err)=>dispatch(failure(err)))
  };
}



export const userActions = {
  login,
  logout,
  register,
  checkSession,
};
