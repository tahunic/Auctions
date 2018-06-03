import { AUCTIONS_LOAD_SUCCESS, AUCTION_LOAD_SUCCESS, BID_UPDATE_SUCCESS } from '../constants/auctions';

const initialState = {
  all: [],
  auction: null,
  currentBid: null
};

export default function auctions(state = initialState, action) {
  switch (action.type) {
    case AUCTIONS_LOAD_SUCCESS:
      return { all: action.payload };
    case AUCTION_LOAD_SUCCESS:
      return { auction: action.payload.data, currentBid: action.payload.latestBid.amount };
    case BID_UPDATE_SUCCESS: 
      return { auction: state.auction, currentBid: action.currentBid };
    default:
      return state;
  }
}
