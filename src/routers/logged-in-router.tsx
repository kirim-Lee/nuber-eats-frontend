import { isLoggedInVar } from '../apollo';

export const LoggedInRouter = () => {
  const onClick = () => {
    isLoggedInVar(false);
  };
  return (
    <div>
      <h1>logged in</h1>
      <button onClick={onClick}>log out</button>
    </div>
  );
};
