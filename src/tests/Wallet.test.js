import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('test wallet component', () => {
  test('Wallet is rendered correctly', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const headerBRL = screen.getByText(/brl/i);
    const numberInput = screen.getByRole('spinbutton');
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const currencyElement = screen.getByText(/currency \|/i);
    const methodElement = screen.getByRole('combobox', { name: /method \|/i });
    const tagElement = screen.getByRole('combobox', { name: /tag \|/i });
    const addExpenses = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(headerBRL).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyElement).toBeInTheDocument();
    expect(methodElement).toBeInTheDocument();
    expect(tagElement).toBeInTheDocument();
    expect(addExpenses).toBeInTheDocument();
  });
  test('Element is added to array', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const numberInput = screen.getByRole('spinbutton');
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const currencyElement = screen.getByText(/currency \|/i);
    const methodElement = screen.getByRole('combobox', { name: /method \|/i });
    const tagElement = screen.getByRole('combobox', { name: /tag \|/i });
    const addExpenses = screen.getByRole('button', { name: /adicionar despesa/i });
    const testCurrency = await screen.findByRole('option', { name: 'AUD' });
    const testMethod = screen.getByRole('option', { name: /cartao de credito/i });
    const testTag = screen.getByRole('option', { name: /saude/i });

    userEvent.type(numberInput, '1.99');
    userEvent.type(descriptionInput, 'lojinha da tia Joana');
    userEvent.selectOptions(currencyElement, testCurrency);
    userEvent.selectOptions(methodElement, testMethod);
    userEvent.selectOptions(tagElement, testTag);
    userEvent.click(addExpenses);

    expect(addExpenses).not.toBeDisabled();
  });
  test('render expenses', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const numberInput = screen.getByRole('spinbutton');
    const addExpenses = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(numberInput, '1.99');
    userEvent.click(addExpenses);

    const cellTag = screen.getByRole('cell', { name: /alimentação/i });
    const cellMethod = screen.getByRole('cell', { name: /dinheiro/i });
    const cellCurrency = screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i });
    const cellExchange = screen.getByRole('cell', { name: /10\.43/i });
    const removeBTN = screen.getByRole('button', { name: /remove/i });

    expect(cellTag).toBeInTheDocument();
    expect(cellMethod).toBeInTheDocument();
    expect(cellExchange).toBeInTheDocument();
    expect(cellCurrency).toBeInTheDocument();

    userEvent.click(removeBTN);

    expect(cellTag).not.toBeInTheDocument();
    expect(cellMethod).not.toBeInTheDocument();
    expect(cellExchange).not.toBeInTheDocument();
    expect(cellCurrency).not.toBeInTheDocument();
  });
});
