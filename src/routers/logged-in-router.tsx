import { Helmet } from 'react-helmet';
import { isLoggedInVar, authToken } from '../apollo';

export const LoggedInRouter = () => {
  const onClick = () => {
    isLoggedInVar(false);
  };

  return (
    <div>
      <Helmet>
        <title>Logged in</title>
      </Helmet>
      <h1>logged in</h1>
      <p>{authToken()}</p>
      <button onClick={onClick}>log out</button>
    </div>
  );
};
