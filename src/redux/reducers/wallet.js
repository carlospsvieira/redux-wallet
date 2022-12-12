import { FAILURE, GET_CURRENCIES, USER_EXPENSES, REMOVE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: return {
    ...state,
    currencies: action.payload,
  };
  case USER_EXPENSES: return {
    ...state,
    expenses: [...state.expenses, action.payload],
  };
  case REMOVE: return {
    ...state,
    expenses: action.payload,
  };
  case FAILURE: return {
    ...state,
    errorMessage: action.error,
  };
  default: return state;
  }
};

export default wallet;
