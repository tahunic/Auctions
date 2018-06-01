export default function messages(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        error: action.messages
      };
    case 'CONTACT_FORM_SUCCESS':
      return {
        success: action.messages
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        info: action.messages
      };
    case 'CLEAR_MESSAGES':
      return {};
    default:
      return state;
  }
}
