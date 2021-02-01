import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, usePagination } from '../../components/pagination';
import { Restaurant } from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__generated__/category';
const CATEGORY_QUERY = gql`
  query category($slug: String!, $page: Float) {
    category(slug: $slug, page: $page) {
      ok
      error
      totalPages
      totalResults
      category {
        ...CategoryPart
      }
      restaurants {
        ...RestaurantPart
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

type MatchParam = { slug: string };

export const Category = () => {
  const { slug } = useParams<MatchParam>();
  const { page, ...pager } = usePagination(1);

  const { data } = useQuery<category, categoryVariables>(CATEGORY_QUERY, {
    variables: { page, slug },
  });

  return (
    <div className="container flex flex-col">
      <h2 className="text-xl flex flex-row items-center gap-2 rounded-full bg-gray-200 p-4">
        <span className="font-medium">Category</span>
        <span className="text-pink-500">{data?.category.category?.name}</span>
        <span
          className="rounded-full w-12 h-12 bg-gray-200 bg-cover bg-center"
          style={{
            backgroundImage: `url(${data?.category.category?.icon})`,
          }}
        />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mt-5">
        {data?.category.restaurants?.map((restaurant) => (
          <Restaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={data?.category.totalPages ?? 1}
        onNextPageClick={pager.onNextPage}
        onPrevPageClick={pager.onPrevPage}
      />
    </div>
  );
};
