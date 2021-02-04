import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { CreateAccount, CREATE_ACCOUNT } from '../create-account';
import { render, RenderResult, waitFor } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { userRole } from '../../__generated__/globalTypes';
import { getByText } from '@testing-library/react';

describe('<CreateAccount />', () => {
  let mockClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it('render Ok', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Create account');
      renderResult.getAllByText('create account');
    });
  });

  it('error message when requires fail', async () => {
    const { getByPlaceholderText, getByText } = renderResult;
    const email = getByPlaceholderText('email');
    const password = getByPlaceholderText('password');
    await waitFor(() => {
      userEvent.type(email, 'notpattern');
    });
    getByText('email pattern is not matched');

    await waitFor(() => {
      userEvent.type(password, '12');
      userEvent.clear(password);
      userEvent.clear(email);
    });

    getByText('email is required');
    getByText('password is required');
  });

  const createForm = {
    email: 'ttt@ttt.com',
    password: '12345',
    role: userRole.CLIENT,
  };

  it('create account query', async () => {
    const handler = jest.fn().mockResolvedValue({
      data: { createAccount: { ok: true, error: null } },
    });

    mockClient.setRequestHandler(CREATE_ACCOUNT, handler);

    const {
      getByTestId,
      getByRole,
      getByPlaceholderText,
      queryByRole,
    } = renderResult;

    const email = getByPlaceholderText('email');
    const password = getByPlaceholderText('password');
    const role = getByTestId('role-select');
    const submit = getByRole('button');

    await waitFor(() => {
      userEvent.type(email, createForm.email);
      userEvent.type(password, createForm.password);
      userEvent.selectOptions(role, createForm.role);
    });

    await waitFor(() => {
      userEvent.click(submit);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(createForm);

    expect(queryByRole('alert')).not.toBeInTheDocument();
  });

  it('create account query return error case', async () => {
    const handler = jest.fn().mockResolvedValue({
      data: { createAccount: { ok: false, error: 'error occures' } },
    });

    mockClient.setRequestHandler(CREATE_ACCOUNT, handler);

    const {
      getByTestId,
      getByRole,
      getByPlaceholderText,
      getByText,
    } = renderResult;

    const email = getByPlaceholderText('email');
    const password = getByPlaceholderText('password');
    const role = getByTestId('role-select');
    const submit = getByRole('button');

    await waitFor(() => {
      userEvent.type(email, createForm.email);
      userEvent.type(password, createForm.password);
      userEvent.selectOptions(role, createForm.role);
    });

    await waitFor(() => {
      userEvent.click(submit);
    });

    getByText('error occures');
  });

  it('create account query return fetch error', async () => {
    const handler = jest.fn().mockRejectedValue(Error('messages'));

    mockClient.setRequestHandler(CREATE_ACCOUNT, handler);

    const {
      getByTestId,
      getByRole,
      getByPlaceholderText,
      getByText,
    } = renderResult;

    const email = getByPlaceholderText('email');
    const password = getByPlaceholderText('password');
    const role = getByTestId('role-select');
    const submit = getByRole('button');

    await waitFor(() => {
      userEvent.type(email, createForm.email);
      userEvent.type(password, createForm.password);
      userEvent.selectOptions(role, createForm.role);
    });

    await waitFor(() => {
      userEvent.click(submit);
    });

    getByText('messages');
  });
});
