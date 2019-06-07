import { urlConstants } from '../../constants/url.constants';

export const adminConstants = {
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

  DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',

  CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',

  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_FAILURE: 'GET_USERS_FAILURE',

  UPDATE_ROOM_REQUEST: 'UPDATE_ROOM_REQUEST',
  UPDATE_ROOM_SUCCESS: 'UPDATE_ROOM_SUCCESS',
  UPDATE_ROOM_FAILURE: 'UPDATE_ROOM_FAILURE',

  DELETE_ROOM_REQUEST: 'DELETE_ROOM_REQUEST',
  DELETE_ROOM_SUCCESS: 'DELETE_ROOM_SUCCESS',
  DELETE_ROOM_FAILURE: 'DELETE_ROOM_FAILURE',

  CREATE_ROOM_REQUEST: 'CREATE_ROOM_REQUEST',
  CREATE_ROOM_SUCCESS: 'CREATE_ROOM_SUCCESS',
  CREATE_ROOM_FAILURE: 'CREATE_ROOM_FAILURE',

  GET_ROOMS_REQUEST: 'GET_ROOMS_REQUEST',
  GET_ROOMS_SUCCESS: 'GET_ROOMS_SUCCESS',
  GET_ROOMS_FAILURE: 'GET_ROOMS_FAILURE',

  GET_RESERVATIONS_REQUEST: 'GET_RESERVATIONS_REQUEST',
  GET_RESERVATIONS_SUCCESS: 'GET_RESERVATIONS_SUCCESS',
  GET_RESERVATIONS_FAILURE: 'GET_RESERVATIONS_FAILURE',

  CREATE_RESERVATION_REQUEST: 'CREATE_RESERVATION_REQUEST',
  CREATE_RESERVATION_SUCCESS: 'CREATE_RESERVATION_SUCCESS',
  CREATE_RESERVATION_FAILURE: 'CREATE_RESERVATION_FAILURE',

  UPDATE_RESERVATION_REQUEST: 'UPDATE_RESERVATION_REQUEST',
  UPDATE_RESERVATION_SUCCESS: 'UPDATE_RESERVATION_SUCCESS',
  UPDATE_RESERVATION_FAILURE: 'UPDATE_RESERVATION_FAILURE',

  DELETE_RESERVATION_FAILURE: 'DELETE_RESERVATION_FAILURE',
  DELETE_RESERVATION_REQUEST: 'DELETE_RESERVATION_REQUEST',
  DELETE_RESERVATION_SUCCESS: 'DELETE_RESERVATION_SUCCESS',
};

function handleResponse(response) {
  if (!response.ok) {
    return response.json()
      .then((res) => { return Promise.reject(res.error); });
  }
  return response.json();
}

// ADMIN USERS ACTIONS

export function updateUser(user, onSuccess) {
  const { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } = adminConstants;
  const { ADMIN_USERS } = urlConstants;
  const url = `${ADMIN_USERS}/${user.id}`;
  const requestOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
  };

  function request() { return { type: UPDATE_USER_REQUEST }; }
  function success(user) { return { type: UPDATE_USER_SUCCESS, user }; }
  function failure(err) { return { type: UPDATE_USER_FAILURE, err }; }

  return (dispatch) => {
    dispatch(request());
    fetch(url, requestOptions)
      .then(handleResponse)
      .then((res) => { 
        dispatch(success(res.user));
        onSuccess();
      })
      .catch((err) => { dispatch(failure(err)); });
  };
}


export function deleteUser(id) {
  function request(id) { return { type: adminConstants.DELETE_USER_REQUEST, id }; }
  function success(id) { return { type: adminConstants.DELETE_USER_SUCCESS, id }; }
  function failure(id, err) { return { type: adminConstants.DELETE_USER_FAILURE, id, err }; }

  const requestOptions = { method: 'DELETE', credentials: 'include' };
  const { ADMIN_USERS } = urlConstants;

  return (dispatch) => {
    dispatch(request(id));
    fetch(`${ADMIN_USERS}/${id}`, requestOptions)
      .then(handleResponse)
      .then((res) => { dispatch(success(res.id)); })
      .catch((err) => { dispatch(failure(id, err)); });
  };
}

export function createUser(user, onSuccess) {
  function request() { return { type: adminConstants.CREATE_USER_REQUEST }; }
  function success(user2) { return { type: adminConstants.CREATE_USER_SUCCESS, user2 }; }
  function failure(err) { return { type: adminConstants.CREATE_USER_FAILURE, err }; }

  const { ADMIN_USERS } = urlConstants;
  const url = `${ADMIN_USERS}/create`;
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
  };

  return (dispatch) => {
    dispatch(request());
    fetch(url, requestOptions)
      .then(handleResponse)
      .then((res) => {
        dispatch(success(res.user));
        onSuccess();
      })
      .catch((err) => { dispatch(failure(err)); });
  };
}

export function getUsers() {
  function request() { return { type: adminConstants.GET_USERS_REQUEST }; }
  function success(users) { return { type: adminConstants.GET_USERS_SUCCESS, users }; }
  function failure(err) { return { type: adminConstants.GET_USERS_FAILURE, err }; }

  const { ADMIN_USERS } = urlConstants;
  const requestOptions = { method: 'GET', credentials: 'include' };

  return (dispatch) => {
    dispatch(request());


    fetch(ADMIN_USERS, requestOptions)
      .then(handleResponse)
      .then((users) => { dispatch(success(users)); })
      .catch((err) => { dispatch(failure(err)); });
  };
}

// ADMIN ROOMS ACTIONS


export function updateRoom(room, onSuccess) {
  function request() { return { type: adminConstants.UPDATE_ROOM_REQUEST, room }; }
  function success(room) { return { type: adminConstants.UPDATE_ROOM_SUCCESS, room }; }
  function failure(err) { return { type: adminConstants.UPDATE_ROOM_FAILURE, err }; }

  const { ROOM_URL } = urlConstants;
  const requestOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room }),
  };

  return (dispatch) => {
    dispatch(request(room));
    fetch(`${ROOM_URL}/${room.id}`, requestOptions)
      .then(handleResponse)
      .then((res) => {
        dispatch(success(res.room));
        onSuccess();
      })
      .catch((err) => { dispatch(failure(err)); });
  };
}


export function deleteRoom(id) {
  function request(id) { return { type: adminConstants.DELETE_ROOM_REQUEST, id }; }
  function success(id) { return { type: adminConstants.DELETE_ROOM_SUCCESS, id }; }
  function failure(id, err) { return { type: adminConstants.DELETE_ROOM_FAILURE, id, err }; }

  const requestOptions = { method: 'DELETE', credentials: 'include' };
  const { ROOM_URL } = urlConstants;

  return (dispatch) => {
    dispatch(request(id));
    fetch(`${ROOM_URL}/${id}`, requestOptions)
      .then(handleResponse)
      .then((res) => { dispatch(success(res.id)); })
      .catch((err) => { dispatch(failure(id, err)); });
  };
}

export function createRoom(room, onSuccess) {
  function request() { return { type: adminConstants.CREATE_ROOM_REQUEST }; }
  function success(room) { return { type: adminConstants.CREATE_ROOM_SUCCESS, room }; }
  function failure(err) { return { type: adminConstants.CREATE_ROOM_FAILURE, err }; }

  const { ROOM_URL } = urlConstants;
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room }),
  };

  return (dispatch) => {
    dispatch(request());
    fetch(ROOM_URL, requestOptions)
      .then(handleResponse)
      .then((res) => {
        dispatch(success(res.room));
        onSuccess();
      })
      .catch((err) => { dispatch(failure(err)); });
  };
}

export function getRooms() {
  function request() { return { type: adminConstants.GET_ROOMS_REQUEST }; }
  function success(rooms) { return { type: adminConstants.GET_ROOMS_SUCCESS, rooms }; }
  function failure(err) { return { type: adminConstants.GET_ROOMS_FAILURE, err }; }

  const { ROOM_URL } = urlConstants;
  const requestOptions = { method: 'GET', credentials: 'include' };

  return (dispatch) => {
    dispatch(request());
    fetch(ROOM_URL, requestOptions)
      .then(handleResponse)
      .then((rooms) => { dispatch(success(rooms)); })
      .catch((err) => { dispatch(failure(err)); });
  };
}

// ADMIN RESERVATIONS ACTIONS

export function deleteReservation(id) {
  function request(id) { return { type: adminConstants.DELETE_RESERVATION_REQUEST, id }; }
  function success(id) { return { type: adminConstants.DELETE_RESERVATION_SUCCESS, id }; }
  function failure(id, err) { return { type: adminConstants.DELETE_RESERVATION_FAILURE, id, err }; }

  
  const { ADMIN_RESERVATIONS } = urlConstants;
  const url = `${ADMIN_RESERVATIONS}/${id}`;
  const requestOptions = { method: 'DELETE', credentials: 'include' };

  return (dispatch) => {
    dispatch(request(id));
    fetch(url, requestOptions)
      .then(handleResponse)
      .then((res) => { dispatch(success(res.id)); })
      .catch((err) => { dispatch(failure(id, err)); });
  };
}


export function createReservation(reservation, onSuccess) {
  function request() { return { type: adminConstants.CREATE_RESERVATION_REQUEST }; }
  function success(reservation) { return { type: adminConstants.CREATE_RESERVATION_SUCCESS, reservation}; }
  function failure(err) { return { type: adminConstants.CREATE_RESERVATION_FAILURE, err }; }

  const { ADMIN_RESERVATIONS } = urlConstants;
  const url = `${ADMIN_RESERVATIONS}/create`;
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reservation }),
  };
 
  return (dispatch) => {
    dispatch(request());
    fetch(url, requestOptions)
      .then(handleResponse)
      .then((res) => {
        dispatch(success(res.reservation));
        onSuccess();
      })
      .catch((err) => { dispatch(failure(err)); });
  };
}

export function updateReservation(reservation, onSuccess) {
  function request() { return { type: adminConstants.UPDATE_RESERVATION_REQUEST, reservation }; }
  function success(reservation) { return { type: adminConstants.UPDATE_RESERVATION_SUCCESS, reservation }; }
  function failure(err) { return { type: adminConstants.UPDATE_RESERVATION_FAILURE, err }; }

  const { ADMIN_RESERVATIONS } = urlConstants;
  const url = `${ADMIN_RESERVATIONS}/${reservation.id}`;
  const requestOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reservation }),
  };

  return (dispatch) => {
    dispatch(request(reservation));
    fetch(url, requestOptions)
      .then(handleResponse)
      .then((res) => {
        dispatch(success(res.reservation));
        onSuccess();
      })
      .catch((err) => { dispatch(failure(err)); });
  };
}

export function getReservations() {
  function request() { return { type: adminConstants.GET_RESERVATIONS_REQUEST }; }
  function success(reservations ) { return { type: adminConstants.GET_RESERVATIONS_SUCCESS, reservations }; }
  function failure(err) { return { type: adminConstants.GET_RESERVATIONS_FAILURE, err }; }

  const { ADMIN_RESERVATIONS } = urlConstants;
  const requestOptions = { method: 'GET', credentials: 'include' };

  return (dispatch) => {
    dispatch(request());
    fetch(ADMIN_RESERVATIONS, requestOptions)
      .then(handleResponse)
      .then((reservations) => { dispatch(success(reservations)); })
      .catch((err) => { dispatch(failure(err)); });
  };
}

