import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  myRestaurant,
  myRestaurantVariables,
} from '../../__generated__/myRestaurant';

type ParamType = { id: string };

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($id: Float!) {
    myRestaurant(id: $id) {
      ok
      error
      restaurant {
        ...RestaurantPart
        menu {
          ...DishPart
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

export const MyRestaurant = () => {
  const { id } = useParams<ParamType>();
  const { data, loading } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: { id: Number(id) },
    }
  );

  if (loading) {
    return <Loading />;
  }

  console.log(data);
  return (
    <div>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      />
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name}
        </h2>
        <Link
          to={`${id}/dish`}
          className="mr-6 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <Link to={``} className="mr-6 text-white bg-lime-600 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        {data?.myRestaurant.restaurant?.menu?.length === 0 ? (
          <h4 className="text-xl mt-6">you have no menu</h4>
        ) : (
          <>{/* TODO : dishes */}</>
        )}
      </div>
      <div></div>
    </div>
  );
};
