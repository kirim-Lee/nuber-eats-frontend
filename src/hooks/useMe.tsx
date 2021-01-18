import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { authToken } from '../apollo';
import { meQuery } from '../__generated__/meQuery';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  const { data, loading, error, refetch } = useQuery<meQuery>(ME_QUERY);

  const token = authToken() || '';

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { data, loading, error };
};
