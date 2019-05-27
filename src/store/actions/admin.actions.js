import {urlConstants} from '../../constants/url.constants';

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
    GET_ROOMS_FAILURE: 'GET_ROOMS_FAILURE'
}

function handleResponse(response) {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }

// ADMIN USERS ACTIONS

export function updateUser(user) {
    const { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } = adminConstants;
    const { ADMIN_USERS } = urlConstants;
    const url = `${ADMIN_USERS}/${user.id}`;
    const requestOptions = {
      method: 'PUT',
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
        .then((res) => {dispatch(success(res.user));})
        .catch((err) => {dispatch(failure(err));});
    };
  }
  
  
  export function deleteUser(id) {
    function request(id) { return { type: adminConstants.DELETE_USER_REQUEST, id }; }
    function success(id) { return { type: adminConstants.DELETE_USER_SUCCESS, id }; }
    function failure(id, err) { return { type: adminConstants.DELETE_USER_FAILURE, id, err }; }
    
    const requestOptions = {method: 'DELETE'};
    const {ADMIN_USERS} = urlConstants;
  
    return (dispatch) => {
      dispatch(request(id));
      fetch(`${ADMIN_USERS}/${id}`, requestOptions)
        .then(handleResponse)
        .then((res)=>{dispatch(success(res.id))})
        .catch((err)=>{dispatch(failure(id, err))})
    }
  }

  export function createUser(user) {
    function request() { return { type: adminConstants.CREATE_USER_REQUEST}; }
    function success(user) { return { type: adminConstants.CREATE_USER_SUCCESS, user }; }
    function failure(err) { return { type: adminConstants.CREATE_USER_FAILURE, err }; }
  
    const { ADMIN_USERS } = urlConstants;
    const url = `${ADMIN_USERS}/create`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    };

    return (dispatch) => {
      dispatch(request());
      fetch(url, requestOptions)
        .then(handleResponse)
        .then((res)=>{dispatch(success(res.user))})
        .catch((err)=>{dispatch(failure(err))})
    }
  }
  
  export function getUsers() {
    function request() { return { type: adminConstants.GET_USERS_REQUEST}; }
    function success(users) { return { type: adminConstants.GET_USERS_SUCCESS, users }; }
    function failure(err) { return { type: adminConstants.GET_USERS_FAILURE, err }; }
  
    const {ADMIN_USERS} = urlConstants;
    const requestOptions = {method: 'GET'};

    return (dispatch) => {
      dispatch(request());


      fetch(ADMIN_USERS, requestOptions)
        .then(handleResponse)
        .then((users)=>{dispatch(success(users))})
        .catch((err)=>{dispatch(failure(err))})
    }
  }  

  // ADMIN ROOMS ACTIONS


  export function updateRoom(room) {   
    
  
    function request() { return { type: adminConstants.UPDATE_ROOM_REQUEST, room }; }
    function success(room) { return { type: adminConstants.UPDATE_ROOM_SUCCESS, room }; }
    function failure(err) { return { type: adminConstants.UPDATE_ROOM_FAILURE, err }; }

    const {ROOM_URL} = urlConstants;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room }),
    };
  
    return (dispatch) => {
      dispatch(request(room));
      fetch(`${ROOM_URL}/${room.id}`, requestOptions)
        .then(handleResponse)
        .then((room) => {dispatch(success(room));})
        .catch((err) => {dispatch(failure(err));});
    };
  }
  
  
  export function deleteRoom(id) {
    function request(id) { return { type: adminConstants.DELETE_ROOM_REQUEST, id }; }
    function success(id) { return { type: adminConstants.DELETE_ROOM_SUCCESS, id }; }
    function failure(id, err) { return { type: adminConstants.DELETE_ROOM_FAILURE, id, err }; }
  
    const requestOptions = {method: 'DELETE'};
    const {ROOM_URL} = urlConstants;
    
    return (dispatch) => {
      dispatch(request(id));
      fetch(`${ROOM_URL}/${id}`, requestOptions)
        .then(handleResponse)
        .then((id)=>{dispatch(success(id))})
        .catch((err)=>{dispatch(failure(id, err))})
    }
  }

  export function createRoom(room) {
    function request() { return { type: adminConstants.CREATE_ROOM_REQUEST}; }
    function success(room) { return { type: adminConstants.CREATE_ROOM_SUCCESS, room }; }
    function failure(err) { return { type: adminConstants.CREATE_ROOM_FAILURE, err }; }
  
    const {ROOM_URL} = urlConstants;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room }),
    };

    return (dispatch) => {
      dispatch(request());
      fetch(ROOM_URL, requestOptions)
        .then(handleResponse)
        .then((room)=>{dispatch(success(room))})
        .catch((err)=>{dispatch(failure(err))})
    }
  }
  
  export function getRooms() {
    function request() { return { type: adminConstants.GET_ROOMS_REQUEST}; }
    function success(rooms) { return { type: adminConstants.GET_ROOMS_SUCCESS, rooms }; }
    function failure(err) { return { type: adminConstants.GET_ROOMS_FAILURE, err }; }
  
    const {ROOM_URL} = urlConstants;
    const requestOptions = {method: 'GET'};
    
    return (dispatch) => {
      dispatch(request());
      fetch(ROOM_URL, requestOptions)
        .then(handleResponse)
        .then((rooms)=>{dispatch(success(rooms))})
        .catch((err)=>{dispatch(failure(err))})
    }
  }

  export function deleteReservation() {
  }
  
  export function createReservation() {
  }

  export function updateReservation() {
  }

  export function getReservations() {
  }