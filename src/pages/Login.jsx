import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(addEmail(this.state));
    history.push('/wallet');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  enterToSubmit = (event) => {
    event.preventDefault();
    this.handleClick();
  };

  render() {
    const { email, password } = this.state;
    const validation = !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
      || password.length < Number('6');

    return (
      <div className="login-container">
        <form onSubmit={this.enterToSubmit}>
          <h1>Redux Wallet</h1>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            onClick={this.handleClick}
            disabled={validation}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {}.isRequired;
export default connect()(Login);
