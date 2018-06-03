import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import auctions from './auctions';

export default combineReducers({
  messages,
  auth,
  auctions
});
