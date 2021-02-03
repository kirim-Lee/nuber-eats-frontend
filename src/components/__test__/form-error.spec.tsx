import React from 'react';
import { render } from '@testing-library/react';
import { FormError } from '../form-error';

describe('<FormError />', () => {
  it('should render ok with props', () => {
    const { getByText } = render(<FormError errorMessage="message error" />);

    getByText('message error');
  });
});
