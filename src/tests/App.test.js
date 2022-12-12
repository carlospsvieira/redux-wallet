import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('redux wallet testing', () => {
  test('Login is rendered correctly', () => {
    renderWithRouterAndRedux(<App />);

    const emailElement = screen.getByPlaceholderText(/email/i);
    const passwordElement = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  test('login button is disabled', () => {
    renderWithRouterAndRedux(<App />);

    const mockEmail = 'carl@carl.com';
    const emailElement = screen.getByPlaceholderText(/email/i);
    const passwordElement = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailElement, mockEmail);
    userEvent.type(passwordElement, '000000');

    expect(loginBtn).toBeEnabled();
  });
});
