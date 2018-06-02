import React, { Component } from 'react';
import { connect } from 'react-redux'
import Messages from '../../components/Messages';
import { Link } from 'react-router';

const initialState = { auctions: [] };

class AuctionIndex extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.fetchAuctions(this.props.token);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {

    if (!questionnaire) {
        return <div>Loading...</div>
    }

    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <div className="row">
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <img className="img-responsive" src="https://loremflickr.com/320/240/product" alt="" />
                <br />                
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                    mollis euismod. Donec sed odio dui.</p>
                <a href="#" role="button" className="btn btn-default">View details</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <img className="img-responsive" src="https://loremflickr.com/320/240/product" alt="" />
                <br />                         
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                    mollis euismod. Donec sed odio dui.</p>
                <a href="#" role="button" className="btn btn-default">View details</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <img className="img-responsive" src="https://loremflickr.com/320/240/product" alt="" />
                <br />
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                    mollis euismod. Donec sed odio dui.</p>
                <a href="#" role="button" className="btn btn-default">View details</a>
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
  };
};

export default connect(mapStateToProps)(AuctionIndex);
