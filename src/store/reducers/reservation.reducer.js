import {userConstants} from '../../constants/user.constants';
const { 
    RESERVATION_FAILURE, 
    RESERVATION_REQUEST, 
    RESERVATION_SUCCESS, 
} = userConstants;


export function reservation(state = {}, action) {
  switch (action.type) {
      case RESERVATION_REQUEST:
        return {room:{}, fetching :true, success: false }
      case RESERVATION_FAILURE:
        return {room:{...action.data.room}, fetching:false, success: true};
      case RESERVATION_SUCCESS:
        return {room:{}, fetching:false, success: false}; 
    default:
      return state;
  }
}


