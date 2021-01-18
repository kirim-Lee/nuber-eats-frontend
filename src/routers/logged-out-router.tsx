import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CreateAccount } from '../pages/create-account';
import { Login } from '../pages/login';
import { NotFound } from '../pages/notFound';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/create-account" component={CreateAccount} />
        <Route exact path="/" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};
