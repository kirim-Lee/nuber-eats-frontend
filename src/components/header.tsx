import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { Logo } from './logo';

export const Header = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-400 p-3 text-center text-xs">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Logo className="inline-block text-4xl" />
          <span className="text-xs">
            <Link to="/my-profile">
              <FontAwesomeIcon icon={faAddressBook} /> {data?.me.email || ''}
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
