import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { usePagination } from '../../components/pagination';
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

  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    { variables: { page, slug } }
  );
  console.log(data);
  return <div>ategory</div>;
};
