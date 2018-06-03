import {
  AUCTION_ADD_SUCCESS,
  AUCTION_ADD_ERROR,
  AUCTIONS_LOAD_SUCCESS,
  AUCTIONS_LOAD_ERROR,
  AUCTIONS_WON_LOAD_SUCCESS,
  AUCTIONS_WON_LOAD_ERROR,
  AUCTION_LOAD_SUCCESS,
  AUCTION_LOAD_ERROR,
  BID_UPDATE_SUCCESS,
  BID_UPDATE_ERROR
} from '../constants/auctions';
import { CLEAR_MESSAGES } from '../constants/messages';

// Since we are using messages components for displaying success and error messages
// In every action we dispatch clear messages so that previous messages are cleared

/**
 *
 * Create new auction
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
    return fetch('/api/auctions', {
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
            messages: Array.isArray(json) ? json : [json]
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
 * Get all auctions
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
    return fetch('/api/auctions', {
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

/**
 *
 * Get won auctions by user
 * 
 * @param  {string} token Auth token
 *
 * @return {object} An action object with a type of AUCTIONS_WON_LOAD_SUCCESS if successful or AUCTIONS_WON_LOAD_ERROR if error
 */
export function fetchWonAuctions(token) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch('/api/auctions/won', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: AUCTIONS_WON_LOAD_SUCCESS,
            payload: Array.isArray(json) ? json : [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: AUCTIONS_WON_LOAD_ERROR,
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  }
}

/**
 *
 * Get auction by id
 * 
 * @param  {string} id Auction ID
 * @param  {string} token Auth token
 *
 * @return {object} An action object with a type of AUCTION_LOAD_SUCCESS if successful or AUCTION_LOAD_ERROR if error
 */
export function fetchAuction(id, token) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch(`/api/auctions/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: AUCTION_LOAD_SUCCESS,
            payload: json
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: AUCTION_LOAD_ERROR,
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  }
}

/**
 *
 * Submit new bid for an auction
 * 
 * @param  {number} currentBid Current bid amount for auction
 * @param  {number} newBid New bid amount for auction
 * @param  {object} auction Auction object
 * @param  {string} token Auth token
 *
 * @return {object} An action object with a type of BID_UPDATE_SUCCESS if successful or BID_UPDATE_ERROR if error
 */
export function submitNewBid(currentBid, newBid, auction, token) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch(`/api/bids`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        currentBid,
        newBid,
        auction
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: BID_UPDATE_SUCCESS,
            messages: json.messages,
            currentBid: json.amount
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: BID_UPDATE_ERROR,
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  }
}