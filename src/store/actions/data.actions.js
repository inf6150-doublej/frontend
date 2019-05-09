
// import * as types from '../../constants/actionTypes';
import { dataConstants, urlConstants } from '../../constants';


function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}


export function fetchSalle(id) {
  const { PRODUCT_URL } = urlConstants;
  const { FETCH_SUCCESS_PRODUCT, FETCH_FAILURE_PRODUCT, FETCH_REQUEST_PRODUCT } = dataConstants;
  function request() { return { type: FETCH_REQUEST_PRODUCT }; }
  function success(data) { return { type: FETCH_SUCCESS_PRODUCT, data }; }
  function failure(error) { return { type: FETCH_FAILURE_PRODUCT, error }; }

  return (dispatch) => {
    dispatch(request());
    fetch(`${PRODUCT_URL}${id}`)
      .then(handleResponse)
      .then(data => dispatch(success(data)))
      .catch(err => dispatch(failure, err))
  };
}


export function fetchSearchResults(endpoint) {
  const { FETCH_SUCCESS_SEARCH_RESULT, FETCH_FAILURE_SEARCH_RESULT, FETCH_REQUEST_SEARCH_RESULT } = dataConstants;
  function request() { return { type: FETCH_REQUEST_SEARCH_RESULT }; }
  function success(data) { return { type: FETCH_SUCCESS_SEARCH_RESULT, data }; }
  function failure(error) { return { type: FETCH_FAILURE_SEARCH_RESULT, error }; }

  return (dispatch) => {
    dispatch(request());
    fetch(endpoint)
      .then(handleResponse)
      .then(data => dispatch(success(data)))
      .catch(err => dispatch(failure, err))
  };
}


export function viewSalle(salle, history) {
  function success(_item) { return { type: dataConstants.VIEW_HERO_ITEM, _item }; }
  return (dispatch) => {
    dispatch(success(salle));
    history.push(`/salles/${salle.id}`);
  };
}

export const dataActions = {
  fetchSearchResults,
  viewSalle,
  fetchSalle,
};