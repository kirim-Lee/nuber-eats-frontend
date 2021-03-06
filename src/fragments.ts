import { gql } from '@apollo/client';

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantPart on Restaurant {
    id
    name
    coverImage
    category {
      id
      name
      icon
      slug
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryPart on Category {
    id
    name
    icon
    slug
    restaurantCount
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishPart on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;
