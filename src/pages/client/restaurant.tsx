import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Restaurant } from '../../components/restaurant';
import {
  restaurantQuery,
  restaurantQueryVariables,
} from '../../__generated__/restaurantQuery';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery<
    restaurantQuery,
    restaurantQueryVariables
  >(RESTAURANT_QUERY, { variables: { page } });

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="search"
          placeholder="Search restaurant..."
          className="text-input w-3/12 rounded-md border-0"
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
          <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-5">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md mt-10 mx-auto items-center">
            <div>
              {page > 1 && (
                <button
                  className="focus:outline-none"
                  onClick={onPrevPageClick}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="font-medium text-xl"
                  />
                </button>
              )}
            </div>
            <span className="mx-5">
              page {page} of {data?.restaurants.totalPages ?? 0}
            </span>
            <div>
              {page < (data?.restaurants.totalPages ?? 0) && (
                <button
                  className="focus:outline-none"
                  onClick={onNextPageClick}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="font-medium text-xl"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
