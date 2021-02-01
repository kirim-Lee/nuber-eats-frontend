/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { authToken, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { Restaurants } from '../pages/client/restaurants';
import { SearchRestaurant } from '../pages/client/search-restaurant';
import { Category } from '../pages/client/category';
import { Orders } from '../pages/owner/orders';
import { userRole } from '../__generated__/globalTypes';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/notFound';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';

const ClientRouter = () => [
  <Route exact key={'restaurant'} path="/" component={Restaurants} />,
  <Route
    exact
    key={'search'}
    path="/search-restaurant"
    component={SearchRestaurant}
  />,
  <Route exact key={'category'} path="/category/:slug" component={Category} />,
];

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
        {data?.me.role === userRole.CLIENT ? ClientRouter() : OwnerRouter()}
        <Route path="/confirm" component={ConfirmEmail} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="*" component={NotFound} />
      </Switch>
      <button onClick={onLogout}>logout</button>
    </BrowserRouter>
  );
};
