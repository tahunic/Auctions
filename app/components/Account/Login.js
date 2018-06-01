import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { login } from '../../actions/auth';
import Messages from '../Messages';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.username, this.state.password));
  }

  render() {
    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleLogin.bind(this)}>
              <legend>Log In</legend>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Username" autoFocus className="form-control" value={this.state.username} onChange={this.handleChange.bind(this)}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this)}/>
              </div>
              <button type="submit" className="btn btn-success">Log in</button>
            </form>
          </div>
        </div>
        <p className="text-center">
          Don't have an account? <Link to="/signup"><strong>Sign up</strong></Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Login);
