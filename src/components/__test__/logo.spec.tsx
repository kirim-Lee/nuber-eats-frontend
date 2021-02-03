import { render } from '@testing-library/react';
import React from 'react';
import { Logo } from '../logo';

describe('<Logo />', () => {
  it('logo', () => {
    const { getByText } = render(<Logo />);
    getByText('Nuber');
    getByText('Eats');
  });
});
