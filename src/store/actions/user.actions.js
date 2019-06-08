import { userConstants, urlConstants } from '../../constants';
// TODO remove cookie-universal from npm

function handleResponse(response) {
  if (!response.ok) {
    return response.json()
      .then((res) => Promise.reject(res.error));
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
    headers: { 'Content-Type': 'application/json' },
  };

  const { GET_USER } = urlConstants;

  return (dispatch) => {
    dispatch(request());
    fetch(GET_USER, requestOptions)
      .then(handleResponse)
      .then((user) => {
        dispatch(success(user));
      })
      .catch((err) => { dispatch(failure(err)); });
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    fetch(LOGIN_URL, requestOptions)
      .then(handleResponse)
      .then((user) => {
        // TODO add history push myaccount
        dispatch(success(user));
        history.push('/');
      })
      .catch((err) => { dispatch(failure(err)); });
  };
}

export function logout(history) {
  const { LOGOUT_URL } = urlConstants;
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };

  fetch(LOGOUT_URL, requestOptions)
    .then(handleResponse)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  history.push('/');
  return { type: userConstants.LOGOUT };
}

export function register(user) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(err) { return { type: userConstants.REGISTER_FAILURE, err }; }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ user }),
  };
  return (dispatch) => {
    dispatch(request(user));
    fetch(urlConstants.REGISTER_URL, requestOptions)
      .then(handleResponse)
      .then((res) => {
        dispatch(success(res.user));
      })
      .catch(err => dispatch(failure(err)));
  };
}

export function isAuthenticated() {
  // return cookies.get('user') && cookies.get('user').user;
}

export function reserve(room, user, begin, end, history) {
  function request() { return { type: userConstants.RESERVATION_REQUEST }; }
  function success(confirmation) { return { type: userConstants.RESERVATION_SUCCESS, confirmation }; }
  function failure(err) {
    console.log(err);
    return { type: userConstants.RESERVATION_FAILURE, err };
  }

  const data = {
    room,
    user,
    begin,
    end,
  };

  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
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
      .catch(err => dispatch(failure(err)));
  };
}

export function recoverPassword(email) {
  function request() { return { type: userConstants.RECOVER_PASSWORD_REQUEST }; }
  function success(message) { return { type: userConstants.RECOVER_PASSWORD_SUCCESS, message }; }
  function failure(err) { return { type: userConstants.RECOVER_PASSWORD_FAILURE, err }; }

  const { RECOVER_PASSWORD } = urlConstants;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  };

  return (dispatch) => {
    dispatch(request());
    fetch(RECOVER_PASSWORD, requestOptions)
      .then(handleResponse)
      .then((res) => {
        dispatch(success(res.msg));
      })
      .catch(err => dispatch(failure(err)));
  };
}

export const userActions = {
  login,
  logout,
  register,
  checkSession,
  reserve,
  isAuthenticated,
  recoverPassword,
};
