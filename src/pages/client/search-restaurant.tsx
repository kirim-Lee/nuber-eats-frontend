import { gql, useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Pagination, usePagination } from '../../components/pagination';
import { Restaurant } from '../../components/restaurant';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { getSearch } from '../../util';
import {
  searchRestaurant,
  searchRestaurantVariables,
} from '../../__generated__/searchRestaurant';

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($query: String!, $page: Float) {
    searchRestaurant(query: $query, page: $page) {
      ok
      error
      totalPages
      totalResults
      result {
        ...RestaurantPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
export const SearchRestaurant = () => {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const history = useHistory();
  const { page, ...searchPager } = usePagination(1);

  const [search, { data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  const handleSearchFromLocation = useCallback(
    (keyword: string) => {
      if (!keyword) {
        history.push('/');
      }

      if (keyword !== query) {
        setQuery(keyword);
        searchPager.updatePage(1);
        search({ variables: { query: keyword, page: 1 } });
      }
    },
    [query, history, searchPager, search]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage !== page) {
        search({ variables: { query, page } });
      }
    },
    [query, page, search]
  );

  useEffect(() => {
    handlePageChange(page);
  }, [page, handlePageChange]);

  useEffect(() => {
    const keyword = getSearch(location.search, 'searchTerm');
    handleSearchFromLocation(keyword);
  }, [location.search, handleSearchFromLocation]);

  return (
    <div className="container">
      <div className="text-xl flex flex-row items-center gap-2 rounded-full bg-gray-200 p-4">
        search with{' '}
        <span className="text-pink-500">{called && ` ${query}`}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mt-5">
        {data?.searchRestaurant.result?.map((restaurant) => (
          <Restaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={data?.searchRestaurant.totalPages ?? 1}
        onNextPageClick={searchPager.onNextPage}
        onPrevPageClick={searchPager.onPrevPage}
      />
    </div>
  );
};
