/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { authToken, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { Restaurants } from '../pages/client/restaurant';
import { Orders } from '../pages/owner/orders';
import { userRole } from '../__generated__/globalTypes';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';

const ClientRouter = () => [<Route exact path="/" component={Restaurants} />];

const OwnerRouter = () => [<Route exact path="/" component={Orders} />];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  const onLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
    authToken(null);
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
    <BrowserRouter>
      <Header />
      <Switch>
        {data?.me.role}
        {data?.me.role === userRole.CLIENT ? ClientRouter : OwnerRouter}
        <Redirect to="/" />
      </Switch>
      <button onClick={onLogout}>logout</button>
    </BrowserRouter>
  );
};
