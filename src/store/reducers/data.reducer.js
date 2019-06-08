import { dataConstants } from '../../constants/data.constants';

const initialState = { fetching: false };


export function roomsFetcher(state = initialState, action) {
  const { FETCH_SUCCESS_SEARCH_RESULT, FETCH_FAILURE_SEARCH_RESULT, FETCH_REQUEST_SEARCH_RESULT, LEAVE_FEEDBACK_REQUEST, LEAVE_FEEDBACK_SUCCESS, LEAVE_FEEDBACK_FAILURE, } = dataConstants;
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
        nothingFound: action.data.nothingFound,
      };
    case FETCH_FAILURE_SEARCH_RESULT:
      return {
        fetching: false,
        rooms: [],
      };

    case LEAVE_FEEDBACK_REQUEST:
      return { registering: true };
    case LEAVE_FEEDBACK_SUCCESS:
      return {
        registering: false,
        user: action.user,
      };
    case LEAVE_FEEDBACK_FAILURE:
      return { registering: false, error: action.err };

    default:
      return state;
  }
}
