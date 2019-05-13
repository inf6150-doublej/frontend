import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { fetchRoom, fetchSearchResults } from './data.reducer';


const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  fetchRoom,
  fetchSearchResults
});

export default rootReducer;
