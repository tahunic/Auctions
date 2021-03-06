import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import AuctionAdd from './components//Auction/AuctionAdd';
import AuctionIndex from './components/Auction/AuctionIndex';
import AuctionDetails from './components/Auction/AuctionDetails';
import AuctionWon from './components/Auction/AuctionWon';

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/');
    }
  };
  const loginIfNotAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={AuctionIndex} onEnter={loginIfNotAuthenticated} onLeave={clearMessages}/>
      <Route path="/auctions/won" component={AuctionWon} onEnter={loginIfNotAuthenticated} onLeave={clearMessages}/>
      <Route path="/auctions/add" component={AuctionAdd} onEnter={loginIfNotAuthenticated} onLeave={clearMessages}/>
      <Route path="/auctions/:id" component={AuctionDetails} onEnter={loginIfNotAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
