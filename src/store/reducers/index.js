import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { roomsFetcher } from './data.reducer';
import { administrator } from './admin.reducer';
import { reservation } from './reservation.reducer';


const rootReducer = combineReducers({
  authentication,
  registration,
  administrator,
  reservation,
  roomsFetcher
});

export default rootReducer;
