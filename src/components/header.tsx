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
        <div className="bg-gradient-to-r from-yellow-300 via-green-400 to-blue-500 p-3 text-center text-xs ">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="container px-5 xl:px-0 flex justify-between items-center">
          <Logo className="inline-block text-4xl" />
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faAddressBook} /> {data?.me.email || ''}
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
