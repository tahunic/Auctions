import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { fetchAuction, submitNewBid } from '../../actions/auctions';
import Messages from '../../components/Messages';

const initialState = { currentBid: 25, newBid: '' };

class AuctionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // On loading get id query param and dispatch action get auction by id
  componentDidMount() {
    const id = this.props.params.id;
    this.props.fetchAuction(id, this.props.token);
  }

  componentWillReceiveProps(props) {
    console.log('props', props);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.params.id;
    // params: current bid for an auction, new bid, current auctionId, auth token
    this.props.submitNewBid(this.props.currentBid, this.state.newBid, this.props.auction, this.props.token);
    this.setState({ newBid: '' });
  }

  render() {
    if (!this.props.auction) {
      return <div>Loading...</div>
    }

    const { auction } = this.props;

    return (
      <div className="auction-container container-fluid">
        <Messages messages={this.props.messages} />
        <div className="row">
          <div className="col-sm-12">
            <div className="panel">
              <div className="panel-body">
                <div className="col-sm-6 col-xs-12">
                  <img className="img-responsive" src="https://loremflickr.com/320/240/seiko" alt="" />
                  <br />
                  <h3>{auction.title}</h3>
                  <p>{auction.description}</p>
                  <h4>Initial price: {auction.initial_price}$</h4>
                </div>
                <div className="col-sm-6 col-xs-12">
                  <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>Current bid: {this.props.currentBid}$</h1>
                    <div className="form-group">
                      <label htmlFor="newBid">Bid: </label>
                      <input type="number" name="newBid" id="newBid" placeholder="Bid" className="form-control" step="0.01" value={this.state.newBid} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    messages: state.messages,
    auction: state.auctions.auction,
    currentBid: state.auctions.currentBid
  };
};

export default connect(mapStateToProps, { fetchAuction, submitNewBid })(AuctionDetails);
