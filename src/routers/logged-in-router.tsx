/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { authToken, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { Restaurants } from '../pages/client/restaurants';
import { Restaurant } from '../pages/client/restaurant';
import { SearchRestaurant } from '../pages/client/search-restaurant';
import { Category } from '../pages/client/category';
import { MyRestaurants } from '../pages/owner/my-restaurants';
import { userRole } from '../__generated__/globalTypes';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/notFound';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { AddRestaurant } from '../pages/owner/add-restaurant';
import { MyRestaurant } from '../pages/owner/my-restaurant';
import { Loading } from '../components/loading';
import { AddDish } from '../pages/owner/add-dish';

const ClientRouter = [
  { path: '/', component: Restaurants },
  { path: '/restaurant/:id', component: Restaurant },
  { path: '/search-restaurant', component: SearchRestaurant },
  { path: '/category/:slug', component: Category },
];

const OwnerRouter = [
  { path: '/', component: MyRestaurants },
  { path: '/add-restaurant', component: AddRestaurant },
  { path: '/restaurant/:id', component: MyRestaurant },
  { path: '/restaurant/:id/dish', component: AddDish },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  const onLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
    authToken(null);
  };

  if (loading) {
    return <Loading />;
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
        {(data?.me.role === userRole.CLIENT ? ClientRouter : OwnerRouter).map(
          (route) => (
            <Route
              exact={true}
              key={route.path}
              path={route.path}
              component={route.component}
            />
          )
        )}
        <Route path="/confirm" component={ConfirmEmail} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="*" component={NotFound} />
      </Switch>
      <button onClick={onLogout}>logout</button>
    </BrowserRouter>
  );
};
