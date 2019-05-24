import {adminConstants} from '../actions/admin.actions';
const { 
    GET_USERS_FAILURE, 
    GET_USERS_REQUEST, 
    GET_USERS_SUCCESS, 
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS, 
    UPDATE_USER_REQUEST, 
    DELETE_USER_FAILURE, 
    DELETE_USER_REQUEST, 
    DELETE_USER_SUCCESS, 
    CREATE_USER_FAILURE, 
    CREATE_USER_REQUEST, 
    CREATE_USER_SUCCESS
} = adminConstants;


export function administrator(state = {}, action) {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        users: state.users.map(user => user.id === action.id ? { ...user, deleted: true } : user),
      };
    case DELETE_USER_SUCCESS:
      return {
        users: state.users.filter(user => user.id !== action.id),
      };
    case DELETE_USER_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleted, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, error: action.err };
          }
          return user;
        }),
      };

    case GET_USERS_REQUEST:
      return {users:[], fetching :true}
    case GET_USERS_FAILURE:
      return {users:[], fetching:false, error:action.err};
    case GET_USERS_SUCCESS:
      return {...action.users, fetching:false};

    case UPDATE_USER_REQUEST:
      return {...state, fetching :true}
    case UPDATE_USER_FAILURE:
      return {...state, fetching:false, error:action.err};
    case UPDATE_USER_SUCCESS:
      return {
        ...state, 
        users: state.users.map(user => user.id === action.user.id ? action.user : user),
        fetching:false
      };
      
    case CREATE_USER_REQUEST:
        return {fetching :true}
    case CREATE_USER_FAILURE:
      return {fetching:false, error:action.err};
    case CREATE_USER_SUCCESS:
      return {users:[{...action.user}], fetching:false};    
    default:
      return state;
  }
}


