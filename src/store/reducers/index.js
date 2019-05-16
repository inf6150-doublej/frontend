import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { fetchRoom, fetchSearchResults } from './data.reducer';
import { administrator } from './admin.reducer';


const rootReducer = combineReducers({
  authentication,
  registration,
  administrator,
  fetchRoom,
  fetchSearchResults
});

export default rootReducer;
