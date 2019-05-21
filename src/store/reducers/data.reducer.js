import { dataConstants } from '../../constants/data.constants';

const initialState = { fetching: false };


export function fetchAllRooms(state = initialState, action) {
  const { FETCH_SUCCESS_SEARCH_RESULT, FETCH_FAILURE_SEARCH_RESULT, FETCH_REQUEST_SEARCH_RESULT } = dataConstants;
  switch (action.type) {
    case FETCH_REQUEST_SEARCH_RESULT:
      return {
        fetching: true,
        rooms: [],
      };
    case FETCH_SUCCESS_SEARCH_RESULT:
      return {
        fetching: false,
        rooms: action.data.rooms,
      };
    case FETCH_FAILURE_SEARCH_RESULT:
      return {
        fetching: false,
        rooms: [],
      };
    default:
      return state;
  }
}


export function fetchRoom(state = initialState, action) {
  const { FETCH_SUCCESS_PRODUCT, FETCH_FAILURE_PRODUCT, FETCH_REQUEST_PRODUCT } = dataConstants;
  switch (action.type) {
    case FETCH_REQUEST_PRODUCT:
      return {
        fetching: true,
        product: [],
      };
    case FETCH_SUCCESS_PRODUCT:
      return {
        fetching: false,
        product: action.data[0],
      };
    case FETCH_FAILURE_PRODUCT:
      return {
        fetching: false,
        product: [],
      };
    default:
      return state;
  }
}
// export default test;
