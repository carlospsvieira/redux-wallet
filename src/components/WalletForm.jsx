import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, getCurrencies } from '../redux/actions';
import { fetchCurrenciesWithUSDT } from '../services/currenciesAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Cash',
    tag: 'Meal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (states) => {
    const { dispatch, expenses } = this.props;
    const data = await fetchCurrenciesWithUSDT();
    const exchangeRates = data;
    const expense = {
      id: expenses.length,
      ...states,
      exchangeRates,
    };

    dispatch(addExpense(expense));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cash',
      tag: 'Meal',
    });
  };

  enterToSubmit = (e) => {
    e.preventDefault();
    this.handleClick();
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div className="wallet-container">
        <form onSubmit={this.enterToSubmit}>
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={value}
            onChange={this.handleChange}
            placeholder="How much?"
          />
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
            placeholder="Expense Description"
          />
          <div className='selector-container'>
            <label htmlFor="currency">
              CURRENCY
              <select
                name="currency"
                value={currency}
                onChange={this.handleChange}
                data-testid="currency-input"
              >
                {currencies.map((specie) => (
                  <option
                    key={specie}
                    value={specie}
                  >
                    {specie}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="method">
              METHOD
              <select
                data-testid="method-input"
                name="method"
                id="method"
                value={method}
                onChange={this.handleChange}
              >
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
                <option value="Checking">Checking</option>
              </select>
            </label>
            <label htmlFor="expenses">
              TAG
              <select
                data-testid="tag-input"
                name="tag"
                id="expenses"
                value={tag}
                onChange={this.handleChange}
              >
                <option value="Meal">Meal</option>
                <option value="Leisure">Leisure</option>
                <option value="Work">Work</option>
                <option value="Transport">Transport</option>
                <option value="Health">Health</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={() => this.handleClick(this.state)}
          >
            Add
          </button>
        </form >
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {}.isRequired;
export default connect(mapStateToProps)(WalletForm);
