import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const grandTotal = expenses.reduce((total, expense) => (
      total + expense.value * expense.exchangeRates[expense.currency].ask), 0);
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">
          {`Total: R$${grandTotal.toFixed(2)}`}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {}.isRequired;
export default connect(mapStateToProps)(Header);
