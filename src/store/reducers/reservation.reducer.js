import {userConstants} from '../../constants/user.constants';
const { 
    RESERVATION_FAILURE, 
    RESERVATION_REQUEST, 
    RESERVATION_SUCCESS, 
} = userConstants;


export function reservation(state = {}, action) {
  switch (action.type) {
      case RESERVATION_REQUEST:
        return {fetching :true }
      case RESERVATION_FAILURE:
        return {fetching:false, error: action.err };
      case RESERVATION_SUCCESS:
        return {confirmation:{...action.confirmation}, fetching:false}; 
    default:
      return state;
  }
}


