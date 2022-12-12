import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleRemoveExpense = (expenseID) => {
    const { dispatch, expenses } = this.props;
    const newList = expenses.filter((expense) => expense.id !== expenseID);

    dispatch(removeExpense(newList));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className='table-container'>
        <table>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{`$${expense.currency}`}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>R$</td>
                <td>
                  {(expense.value * expense
                    .exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={() => this.handleRemoveExpense(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {}.isRequired;
export default connect(mapStateToProps)(Table);
