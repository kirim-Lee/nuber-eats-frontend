import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { myRestaurants } from '../../__generated__/myRestaurants';

const MY_RESTAURANT_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      results {
        ...RestaurantPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
export const MyRestaurants = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANT_QUERY);

  return (
    <div>
      <Helmet>
        <title>My Restaurants! | Nuber Eats</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auth mt-32">
        <h2 className="text-4xl font-medium mb-10">My Restaurant</h2>
        {data?.myRestaurants.results?.length === 0 && (
          <>
            <h4 className="text-xl mb-5">You have no restaurant</h4>
            <Link className="link" to="/add-restaurant">
              Create one &rarr;
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
