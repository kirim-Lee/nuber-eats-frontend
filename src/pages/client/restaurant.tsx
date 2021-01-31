import { gql, useQuery } from '@apollo/client';
import {
  restaurantQuery,
  restaurantQueryVariables,
} from '../../__generated__/restaurantQuery';

const RESTAURANT_QUERY = gql`
  query restaurantQuery($page: Float) {
    allCategories {
      ok
      error
      categories {
        id
        name
        icon
        slug
        restaurantCount
      }
    }

    restaurants(page: $page) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          id
          name
          icon
        }
        address
        isPromoted
      }
    }
  }
`;
export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    restaurantQuery,
    restaurantQueryVariables
  >(RESTAURANT_QUERY, { variables: { page: 1 } });

  console.log(data?.allCategories);
  console.log(data?.restaurants);

  return (
    <h1>
      uber its header -<p>category</p>
      <p>list</p>`
    </h1>
  );
};
