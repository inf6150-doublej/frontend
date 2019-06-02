
// import * as types from '../../constants/actionTypes';
import { dataConstants, urlConstants } from '../../constants';


function handleResponse(response) {
  if (!response.ok) {
    return response.json()
    .then(res => { return Promise.reject(res.error)})
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data}),
  };

  return (dispatch) => {
    dispatch(request());
    fetch(SEARCH_URL, requestOptions )
      .then(handleResponse)
      .then(data => {
        dispatch(success(data));
      })
      .catch(err => dispatch(failure, err))
  };
}


export function viewRoom(room, history) {
  function success(_item) { return { type: dataConstants.VIEW_HERO_ITEM, _item }; }
  return (dispatch) => {
    dispatch(success(room));
    history.push(`/rooms/${room.id}`);
  };
}

export const dataActions = {
  fetchAllRooms,
  viewRoom,
};