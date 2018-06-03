import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { submitAuctionAddForm } from '../../actions/auctions';
import Messages from '../Messages';

const initialState = {
  title: '',
  description: '',
  initialPrice: '',
  minPrice: '',
  duration: ''
}

class AuctionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(submitAuctionAddForm(this.state, this.props.token));
  }

  render() {
    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <legend>Add new auction</legend>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Title" autoFocus className="form-control" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" placeholder="Description" className="form-control" value={this.state.description} onChange={(e) => this.handleChange(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="initialPrice">Initial price</label>
                <input type="number" name="initialPrice" id="initialPrice" placeholder="Initial Price" className="form-control" step="0.01" value={this.state.initialPrice} onChange={(e) => this.handleChange(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="title">Minimum price</label>
                <input type="number" name="minPrice" id="minPrice" placeholder="Minimum Price" className="form-control" step="0.01" value={this.state.minPrice} onChange={(e) => this.handleChange(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input type="number" name="duration" id="duration" placeholder="Duration (days)" className="form-control" value={this.state.duration} onChange={(e) => this.handleChange(e)}/>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(AuctionAdd);
