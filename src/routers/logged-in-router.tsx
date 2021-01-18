/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { authToken, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { Restaurants } from '../pages/client/restaurant';
import { Orders } from '../pages/owner/orders';
import { NotFound } from '../pages/notFound';
import { userRole } from '../__generated__/globalTypes';
import { meQuery } from '../__generated__/meQuery';
import { useEffect } from 'react';

const ClientRouter = () => [<Route exact path="/" component={Restaurants} />];

const OwnerRouter = () => [<Route exact path="/" component={Orders} />];

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
  const { data, loading, error, refetch } = useQuery<meQuery>(ME_QUERY);
  const token = authToken() || '';

  const onLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
    authToken(null);
  };

  useEffect(() => {
    refetch();
  }, [token]);

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
    <BrowserRouter>
      <Switch>
        {data?.me.role}
        {data?.me.role === userRole.CLIENT ? ClientRouter : OwnerRouter}
        <Redirect to="/" />
      </Switch>
      <button onClick={onLogout}>logout</button>
    </BrowserRouter>
  );
};
