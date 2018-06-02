import { LOGIN_ERROR, SIGNUP_ERROR } from '../constants/auth';
import { AUCTION_ADD_SUCCESS, AUCTION_ADD_ERROR } from '../constants/auctions';
import { CLEAR_MESSAGES } from '../constants/messages';

export default function messages(state = {}, action) {
  switch (action.type) {
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case AUCTION_ADD_ERROR:
      return {
        error: action.messages
      };
    case AUCTION_ADD_SUCCESS:
      return {
        success: action.messages
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        info: action.messages
      };
    case CLEAR_MESSAGES:
      return {};
    default:
      return state;
  }
}
