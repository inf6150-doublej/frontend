import { adminConstants } from '../actions/admin.actions';

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
  CREATE_USER_SUCCESS,
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAILURE,
  DELETE_ROOM_FAILURE,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  GET_RESERVATIONS_REQUEST,
  GET_RESERVATIONS_SUCCESS,
  GET_RESERVATIONS_FAILURE,
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAILURE,
  UPDATE_RESERVATION_REQUEST,
  UPDATE_RESERVATION_SUCCESS,
  UPDATE_RESERVATION_FAILURE,
  DELETE_RESERVATION_FAILURE,
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
} = adminConstants;


export function administrator(state = {}, action) {
  switch (action.type) {
    // ############# ROOMS #############################
    case GET_ROOMS_REQUEST:
      return { rooms: [], fetching: true };
    case GET_ROOMS_FAILURE:
      return { rooms: [], fetching: false };
    case GET_ROOMS_SUCCESS:
      return { ...action.rooms, fetching: false };
    case CREATE_ROOM_REQUEST:
      return { rooms: [], fetching: true, error: null };
    case CREATE_ROOM_FAILURE:
      return { rooms: [], fetching: false, error: action.err };
    case CREATE_ROOM_SUCCESS:
      return { ...action.rooms, fetching: false, error: null };

    case UPDATE_ROOM_REQUEST:
      return { ...state, error: null };
    case UPDATE_ROOM_FAILURE:
      return { ...state, fetching: false, error: action.err };

    case UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.map(room => room.id === action.room.id ? action.room : room), 
        error: null,
      };

    case DELETE_ROOM_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        rooms: state.rooms.map(room => room.id === action.id ? { ...room, deleted: true } : room),
      };
    case DELETE_ROOM_SUCCESS:
      return {
        rooms: state.rooms.filter(room => room.id !== action.id),
      };
    case DELETE_ROOM_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (room.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleted, ...roomCopy } = room;
            // return copy of user with 'deleteError:[error]' property
            return { ...roomCopy, error: action.err };
          }
        }),
      };

    // ############# RESERVATIONS #############################
    
    case GET_RESERVATIONS_REQUEST:
      return { reservations: [], fetching: true };
    case GET_RESERVATIONS_FAILURE:
      return { reservations: [], fetching: false };
    case GET_RESERVATIONS_SUCCESS:
      return { ...action.reservations, fetching: false };
    
      case CREATE_RESERVATION_REQUEST:
      return { fetching: true, error: null };
    case CREATE_RESERVATION_FAILURE:
      return { fetching: false, error: action.err };
    case CREATE_RESERVATION_SUCCESS:
      return { reservations: [{ ...action.reservation }], fetching: false, error: null };

    case UPDATE_RESERVATION_REQUEST:
      return { ...state, fetching: true, error: null };
    case UPDATE_RESERVATION_FAILURE:
      return { ...state, fetching: false, error: action.err };
    case UPDATE_RESERVATION_SUCCESS:
      return {
        ...state,
        reservations: state.reservations.map(reservation => reservation.id === action.reservation.id ? action.reservation : reservation),
        fetching: false,
        error: null,
      };
    
      case DELETE_RESERVATION_REQUEST:
      // add 'deleting:true' property to reservation being deleted
      return {
        ...state,
        reservations: state.reservations.map(reservation => reservation.id === action.id ? { ...reservation, deleted: true } : reservation),
      };
    case DELETE_RESERVATION_SUCCESS:
      return {
        reservations: state.reservations.filter(reservation => reservation.id !== action.id),
      };
    case DELETE_RESERVATION_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to reservation
      return {
        ...state,
        reservations: state.reservations.map((reservation) => {
          if (reservation.id === action.id) {
            // make copy of reservation without 'deleting:true' property
            const { deleted, ...reservationCopy } = reservation;
            // return copy of reservation with 'deleteError:[error]' property
            return { ...reservationCopy, error: action.err };
          }
          return reservation;
        }),
      };


    // ############# USERS #############################
    case GET_USERS_REQUEST:
      return { users: [], fetching: true };
    case GET_USERS_FAILURE:
      return { users: [], fetching: false };
    case GET_USERS_SUCCESS:
      return { ...action.users, fetching: false };
    case CREATE_USER_REQUEST:
      return { fetching: true, error: null };
    case CREATE_USER_FAILURE:
      return { fetching: false, error: action.err };
    case CREATE_USER_SUCCESS:
      return { users: [{ ...action.user }], fetching: false, error: null };

    case UPDATE_USER_REQUEST:
      return { ...state, fetching: true, error: null };
    case UPDATE_USER_FAILURE:
      return { ...state, fetching: false, error: action.err };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => user.id === action.user.id ? action.user : user),
        fetching: false,
        error: null,
      };
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
    default:
      return state;
  }
}
