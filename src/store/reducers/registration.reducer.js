import { userConstants } from '../../constants';

function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return { 
        registering: false,
        user: action.user
      };
    case userConstants.REGISTER_FAILURE:
      return {registering: false, error:action.err};
    default:
      return state;
  }
}

export { registration };
