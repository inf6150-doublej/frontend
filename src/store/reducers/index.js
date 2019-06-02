import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { roomsFetcher } from './data.reducer';
import { administrator } from './admin.reducer';
import { reservation } from './reservation.reducer';


const rootReducer = combineReducers({
  authentication,
  administrator,
  reservation,
  roomsFetcher
});

export default rootReducer;
