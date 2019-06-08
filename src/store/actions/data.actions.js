
// import * as types from '../../constants/actionTypes';
import { dataConstants, urlConstants, userConstants } from '../../constants';


function handleResponse(response) {
  if (!response.ok) {
    return response.json()
      .then((res) => Promise.reject(res.error));
  }
  return response.json();
}


export function fetchAllRooms(data) {
  const { FETCH_SUCCESS_SEARCH_RESULT, FETCH_FAILURE_SEARCH_RESULT, FETCH_REQUEST_SEARCH_RESULT } = dataConstants;
  const { SEARCH_URL } = urlConstants;
  function request() { return { type: FETCH_REQUEST_SEARCH_RESULT }; }
  function success(data) { return { type: FETCH_SUCCESS_SEARCH_RESULT, data }; }
  function failure(error) { return { type: FETCH_FAILURE_SEARCH_RESULT, error }; }

  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  };

  return (dispatch) => {
    dispatch(request());
    fetch(SEARCH_URL, requestOptions)
      .then(handleResponse)
      .then((data) => {
        dispatch(success(data));
      })
      .catch(err => dispatch(failure, err));
  };
}


export function viewRoom(room, history) {
  function success(_item) { return { type: dataConstants.VIEW_HERO_ITEM, _item }; }
  return (dispatch) => {
    dispatch(success(room));
    history.push(`/rooms/${room.id}`);
  };
}

export function leaveFeedback(feedback) {
  function request(user) { return { type: userConstants.LEAVE_FEEDBACK_REQUEST, user }; }
  function success(user) { return { type: userConstants.LEAVE_FEEDBACK_SUCCESS, user }; }
  function failure(err) { return { type: userConstants.LEAVE_FEEDBACK_FAILURE, err }; }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ feedback }),
  };
  return (dispatch) => {
    dispatch(request(feedback));
    fetch(urlConstants.LEAVE_FEEDBACK_URL, requestOptions)
      .then(handleResponse)
      .then((res) => {
        dispatch(success(res.feedback));
      })
      .catch(err => dispatch(failure(err)));
  };
}

export const dataActions = {
  fetchAllRooms,
  viewRoom,
};
