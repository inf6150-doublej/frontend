import { dataConstants } from '../../constants/data.constants';

const initialState = { isFetching: false };


export function fetchSearchResults(state = initialState, action) {
  const { FETCH_SUCCESS_SEARCH_RESULT, FETCH_FAILURE_SEARCH_RESULT, FETCH_REQUEST_SEARCH_RESULT } = dataConstants;
  switch (action.type) {
    case FETCH_REQUEST_SEARCH_RESULT:
      return {
        isFetching: true,
        dataSearchResults: [],
      };
    case FETCH_SUCCESS_SEARCH_RESULT:
      return {
        isFetching: false,
        dataSearchResults: action.data,
      };
    case FETCH_FAILURE_SEARCH_RESULT:
      return {
        isFetching: false,
        dataSearchResults: [],
      };
    default:
      return state;
  }
}


export function fetchSalle(state = initialState, action) {
  const { FETCH_SUCCESS_PRODUCT, FETCH_FAILURE_PRODUCT, FETCH_REQUEST_PRODUCT } = dataConstants;
  switch (action.type) {
    case FETCH_REQUEST_PRODUCT:
      return {
        isFetching: true,
        product: [],
      };
    case FETCH_SUCCESS_PRODUCT:
      return {
        isFetching: false,
        product: action.data[0],
      };
    case FETCH_FAILURE_PRODUCT:
      return {
        isFetching: false,
        product: [],
      };
    default:
      return state;
  }
}
// export default test;
