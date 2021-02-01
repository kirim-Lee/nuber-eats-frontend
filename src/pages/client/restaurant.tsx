import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  restaurant,
  restaurantVariables,
} from '../../__generated__/restaurant';

type MatchParam = { id: string };

const RESTAURANT_QUERY = gql`
  query restaurant($id: Float!) {
    restaurant(restaurantId: $id) {
      ok
      error
      result {
        ...RestaurantPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Restaurant = () => {
  const { id } = useParams<MatchParam>();
  const { data, error } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: { id: Number(id) },
    }
  );

  const restaurant = data?.restaurant.result;

  return (
    <div>
      <div
        className="bg-lime-500 py-40 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${restaurant?.coverImage})`,
        }}
      >
        <div className="bg-white max-w-md shadow-md pl-44 py-10">
          <h4 className="text-4xl font-medium mb-4">{restaurant?.name}</h4>
          <h5 className="text-sm opacity-50 mb-2">
            {restaurant?.category.name}
          </h5>
          <h6 className="text-sm font-light opacity-50">
            {restaurant?.address}
          </h6>
        </div>
      </div>
    </div>
  );
};
