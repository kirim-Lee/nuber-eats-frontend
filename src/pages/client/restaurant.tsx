import { gql, useQuery } from '@apollo/client';
import { Restaurant } from '../../components/restaurant';
import {
  restaurantQuery,
  restaurantQueryVariables,
} from '../../__generated__/restaurantQuery';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { Pagination, usePagination } from '../../components/pagination';

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
        ...RestaurantPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface ISearchForm {
  searchTerm: string;
}
export const Restaurants = () => {
  const history = useHistory();
  const { page, ...restaurantPager } = usePagination(1);

  const { data, loading } = useQuery<restaurantQuery, restaurantQueryVariables>(
    RESTAURANT_QUERY,
    { variables: { page } }
  );

  const onSearchSubmit = ({ searchTerm }: ISearchForm) => {
    history.push({
      pathname: '/search-restaurant',
      search: `searchTerm=${searchTerm}`,
    });
  };

  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
        onSubmit={handleSubmit(onSearchSubmit)}
      >
        <input
          type="search"
          placeholder="Search restaurant..."
          className="text-input w-3/4 md:w-3/12 rounded-md border-0"
          name="searchTerm"
          ref={register({ required: true, min: 2 })}
        />
      </form>
      {!loading && (
        <div className="container mt-8">
          <div className="flex justify-around mx-auto max-w-xs ">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center group cursor-pointer">
                <div
                  key={category.id}
                  className="w-14 h-14 rounded-full bg-gray-500 bg-cover bg-center border-2 border-white group-hover:border-lime-400 "
                  style={{ backgroundImage: `url(${category.icon})` }}
                />
                <span className="text-sm">{category.name}</span>
              </div>
            ))}
          </div>
          {/* restaurant list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mt-5">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={data?.restaurants.totalPages ?? 1}
            onNextPageClick={restaurantPager.onNextPage}
            onPrevPageClick={restaurantPager.onPrevPage}
          />
        </div>
      )}
    </div>
  );
};
