import { fetchCurrencies } from '../../services/currenciesAPI';

export const USER_EMAIL = 'USER_EMAIL';
export const USER_EXPENSES = 'USER_EXPENSES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILURE = 'FAILURE';
export const REMOVE = 'REMOVE';

const receiveCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: Object.keys(currencies),
});

const failure = (error) => ({
  type: FAILURE,
  error,
});

export const addEmail = (userEmail) => ({
  type: USER_EMAIL,
  payload: { ...userEmail },
});

export const addExpense = (userExpenses) => ({
  type: USER_EXPENSES,
  payload: userExpenses,
});

export const removeExpense = (userExpenses) => ({
  type: REMOVE,
  payload: userExpenses,
});

export const getCurrencies = () => async (dispatch) => {
  try {
    const currenciesInfo = await fetchCurrencies();
    dispatch(receiveCurrencies(currenciesInfo));
  } catch (error) {
    dispatch(failure(error));
  }
};
