import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from '../notFound';

describe('<NotFound />', () => {
  it('render Ok', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    getByText('Page not found');
  });
});
