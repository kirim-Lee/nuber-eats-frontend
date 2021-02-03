import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Header } from '../header';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { ME_QUERY } from '../../hooks/useMe';
import { userRole } from '../../__generated__/globalTypes';

interface IMock {
  verified: boolean;
}

const mocks = ({ verified }: IMock) => [
  {
    request: {
      query: ME_QUERY,
    },
    result: {
      data: {
        me: {
          id: 1,
          email: 'test@test.com',
          role: userRole.CLIENT,
          verified,
        },
      },
    },
  },
];

describe('<Header />', () => {
  it('should render ok with props', async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider mocks={mocks({ verified: false })}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));

      getByText('Please verify your email');
    });
  });

  it('should render verified ok with props', async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider mocks={mocks({ verified: true })}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(queryByText('Please verify your email')).toBeNull();
    });
  });
});
