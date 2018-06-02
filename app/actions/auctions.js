import { AUCTION_ADD_SUCCESS, AUCTION_ADD_ERROR, AUCTIONS_LOAD_SUCCESS, AUCTIONS_LOAD_ERROR } from '../constants/auctions';
import { CLEAR_MESSAGES } from '../constants/messages';

/**
 *
 * Create new auctions
 * 
 * @param  {object} data The user data
 * @param  {string} token Auth token
 *
 * @return {object} An action object with a type of AUCTION_ADD_SUCCESS if successful or AUCTION_ADD_ERROR if error
 */
export function submitAuctionAddForm(data, token) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch('/auctions', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        initialPrice: data.initialPrice,
        minPrice: data.minPrice,
        duration: data.duration
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: AUCTION_ADD_SUCCESS,
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: AUCTION_ADD_ERROR,
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    })
  };
}

/**
 *
 * Get auctions
 * 
 * @param  {string} token Auth token
 *
 * @return {object} An action object with a type of AUCTIONS_LOAD_SUCCESS if successful or AUCTIONS_LOAD_ERROR if error
 */
export function fetchAuctions(token) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch('/auctions', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: AUCTIONS_LOAD_SUCCESS,
            payload: json
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: AUCTIONS_LOAD_ERROR,
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  }
}