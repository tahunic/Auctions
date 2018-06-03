import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { fetchWonAuctions } from '../../actions/auctions';
import Messages from '../../components/Messages';

const initialState = { auctions: null };

class AuctionWon extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.fetchWonAuctions(this.props.token);
  }

  componentWillReceiveProps(props) {
    console.log('props', props);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (!this.props.auctions) {
      return <div>Loading...</div>
    }
    if (this.props.auctions.length === 0) {
      return (
        <div className="container text-center">
          <h1>No won auctions</h1>
          <p>You have not won any auctions yet. Bid on <Link to={'/'}>live auctions</Link>.</p>
        </div>
      )
    }
    
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <div className="row">
          {this.props.auctions.map((auction) => {
            return (
              <div key={auction.id} className="col-sm-4">
                <div className="panel">
                  <div className="panel-body">
                    <img className="img-responsive" src="https://loremflickr.com/320/240/seiko" alt="" />
                    <br />
                    <h3>{auction.title}</h3>
                    <p>{`${auction.description.substring(0, 250)}...`}</p>
                    <h4>Initial price: {auction.initial_price}$</h4>
                    <h4>Posted by user: <strong>{auction.owner.username}</strong></h4>
                    <Link to={`/auctions/${auction.external_id}`} role="button" className="btn btn-default">View details</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    messages: state.messages,
    auctions: state.auctions.won
  };
};

export default connect(mapStateToProps, { fetchWonAuctions })(AuctionWon);
