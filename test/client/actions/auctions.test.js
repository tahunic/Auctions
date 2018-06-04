import 'isomorphic-fetch'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as actions from '../../../app/actions/auctions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('auctions actions', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS5kb21haW4uY29tIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6IjE0NjMyNTU0MjYiLCJleHAiOiIxNDYzODYxMjIyIn0.Cchy4zAn7-mPdUu1BXzeIG8x3cvQztszI2faWGETTEE';
  const auction = {
    title: 'Auction 1',
    description: 'Auction description',
    initialPrice: 1,
    minPrice: 1,
    duration: 1
  };

  afterEach(() => {
    fetchMock.restore();
  });

  it('creates AUCTION_ADD_SUCCESS action when form is submitted', () => {
    fetchMock.mock('/api/auctions', 'POST', {
      body: { msg: 'New auction successfully added.' }
    });

    const expectedActions = [
      { type: 'CLEAR_MESSAGES' },
      { type: 'AUCTION_ADD_SUCCESS', messages: [{ msg: 'New auction successfully added.' }] }
    ];

    const store = mockStore({});

    return store.dispatch(actions.submitAuctionAddForm(auction))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
