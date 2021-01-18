/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { isLoggedInVar, authToken } from '../apollo';
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

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  const onClick = () => {
    isLoggedInVar(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">loading...</span>
      </div>
    );
  }

  if (error?.message) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">
          {error.message}
        </span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Logged in</title>
      </Helmet>
      <h1>logged in</h1>
      <p>{data?.me?.email}</p>
      <button onClick={onClick}>log out</button>
    </div>
  );
};
