import { gql } from '@apollo/client';
import { FormButton } from '../../components/form-button';
import { useMe } from '../../hooks/useMe';

const EDIT_PROFILE = gql`
  mutation EditProgile($email: String, $password: String) {
    editProfile(email: $email, password: $password) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const { data: userData } = useMe();
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit profile</h4>
      <form className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
        <input type="email" className="text-input" placeholder="email" />
        <input type="password" className="text-input" placeholder="password" />
        <FormButton loading={false} label={'Save profile'} />
      </form>
    </div>
  );
};
