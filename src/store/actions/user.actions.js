import Cookies from 'universal-cookie';
import { userConstants, urlConstants } from '../../constants';

const cookies = new Cookies();


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

  const { GET_USER } = urlConstants

  return (dispatch) => {
    dispatch(request());
    fetch(GET_USER, requestOptions)
      .then(handleResponse)
      .then((user) => {
        cookies.set('user', user);
        dispatch(success(user));
      })
      .catch((err) => {dispatch(failure(err));});
  };
}

export function login(email, password, history) {
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
        history.push('/');
      })
      .catch((err) => {dispatch(failure(err));});
  };
}

export function logout(history) {
  const{LOGOUT_URL} = urlConstants;
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json'},
  };

  fetch(LOGOUT_URL, requestOptions)
  .then(handleResponse)
  .then((res)=>console.log(res))
  .catch(err=>console.log(err))
  history.push('/');
  cookies.remove('user', { path: '/' });
  return { type: userConstants.LOGOUT };
}

export function register(user, history) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(err) { return { type: userConstants.REGISTER_FAILURE, err }; }
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({user}),
  };
  return (dispatch) => {
    dispatch(request(user));
    fetch(urlConstants.REGISTER_URL, requestOptions)
      .then(handleResponse)
      .then((res)=> {
        dispatch(success(res.user));
        history.push('/');
      })
      .catch((err)=>dispatch(failure(err)))
  };
}

export function reserve(room, user, begin, end, history) {
  function request() { return { type: userConstants.RESERVATION_REQUEST }; }
  function success(confirmation) { 
    return { type: userConstants.RESERVATION_SUCCESS, confirmation }; }
  function failure(err) { return { type: userConstants.RESERVATION_FAILURE, err }; }

  const data = {
    room,
    user,
    begin,
    end
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data}),
  };

  const { RESERVATION_URL } = urlConstants;
  return (dispatch) => {
    dispatch(request(room));
    fetch(RESERVATION_URL, requestOptions)
      .then(handleResponse)
      .then(() => {
        dispatch(success(data));
        history.push('/confirmation');
      })
      .catch((err)=>dispatch(failure(err)))
  };
}

export const userActions = {
  login,
  logout,
  register,
  checkSession,
  reserve
};
