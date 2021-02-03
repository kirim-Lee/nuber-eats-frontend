import { render } from '@testing-library/react';
import React from 'react';
import { FormButton } from '../form-button';

describe('<FormButton />', () => {
  it('should render ok with props', () => {
    const { getByText } = render(<FormButton label="label" />);

    getByText('label');
  });

  it('should render loading with props', () => {
    const { getByText } = render(<FormButton label="label" loading={true} />);

    getByText('loading...');
  });
});
