import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { CreateAccount } from '../create-account';
import { render, RenderResult, waitFor } from '../../test-utils';

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
});
