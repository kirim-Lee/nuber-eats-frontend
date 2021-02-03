import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { restaurantQuery_restaurants_results } from '../../__generated__/restaurantQuery';
import { Restaurant } from '../restaurant';

const restaurant: restaurantQuery_restaurants_results = {
  __typename: 'Restaurant',
  id: 1,
  name: 'bbq',
  coverImage: 'img.png',
  category: {
    __typename: 'Category',
    id: 2,
    name: 'hamburger',
    icon: 'icon.png',
    slug: 'burger',
  },
  address: 'street x',
  isPromoted: false,
};

describe('<Restaurant />', () => {
  it('renders Ok with props', () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <Restaurant restaurant={restaurant} />
      </BrowserRouter>
    );

    getByText('bbq');
    getByText('hamburger');
    expect(container.firstChild).toHaveAttribute('href', '/restaurant/1');
  });
});
