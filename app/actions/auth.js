import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGOUT_SUCCESS } from '../constants/auth';
import { CLEAR_MESSAGES } from '../constants/messages';

export function login(username, password) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch('/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: LOGIN_SUCCESS,
            token: json.token,
            user: json.user
          });
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          browserHistory.push('/');
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: LOGIN_ERROR,
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function signup(username, password) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch('/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    }).then((response) => {
      return response.json().then((json) => {
        if (response.ok) {
          dispatch({
            type: SIGNUP_SUCCESS,
            token: json.token,
            user: json.user
          });
          browserHistory.push('/');
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
        } else {
          dispatch({
            type: SIGNUP_ERROR,
            messages: Array.isArray(json) ? json : [json]
          });
        }
      });
    });
  };
}

export function logout() {
  cookie.remove('token');
  browserHistory.push('/');
  return {
    type: LOGOUT_SUCCESS
  };
}

