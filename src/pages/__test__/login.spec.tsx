import { render, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Login, LOGIN_MUTATION } from '../login';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/client';
import userEvent from '@testing-library/user-event';

describe('<Login />', () => {
  let mockClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </ApolloProvider>
      );
    });
  });

  it('login with right props', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Welcome to Nuber Eats!');
    });
  });

  it('display email validation error', async () => {
    const { getAllByPlaceholderText, getByRole } = renderResult;
    const email = getAllByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email[0], 'ttt@ttt.com');
      userEvent.clear(email[0]);
    });
    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('Email is required');
  });

  it('display password validation error', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submit = getByRole('button');

    await waitFor(() => {
      userEvent.type(email, 'ttt@ttt.com');
      userEvent.click(submit);
    });
    expect(submit).toHaveAttribute('disabled');

    await waitFor(() => {
      userEvent.type(password, 'ttt@ttt.com');
    });
    expect(submit).not.toHaveAttribute('disabled');
  });

  it('submit form and calls mutation', async () => {
    const formData = {
      email: 'ttt@ttt.com',
      password: '12345',
    };
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submit = getByRole('button');

    const queryHandler = jest
      .fn()
      .mockResolvedValue({ data: { login: { ok: true, token: 'string' } } });

    mockClient.setRequestHandler(LOGIN_MUTATION, queryHandler);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
    });

    await waitFor(() => {
      userEvent.click(submit);
    });

    expect(queryHandler).toHaveBeenCalledTimes(1);
    expect(queryHandler).toHaveBeenCalledWith(formData);
  });
});
