import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormButton } from '../../components/form-button';
import { useMe } from '../../hooks/useMe';
import {
  editProfileMutation,
  editProfileMutationVariables,
} from '../../__generated__/editProfileMutation';

const EDIT_PROFILE = gql`
  mutation editProfileMutation($email: String, $password: String) {
    editProfile(email: $email, password: $password) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const client = useApolloClient();
  const { data: userData } = useMe();
  const {
    register,
    handleSubmit,
    getValues,
    formState,
  } = useForm<editProfileMutationVariables>({
    defaultValues: {
      email: userData?.me?.email,
    },
    mode: 'onChange',
  });

  const onCompleted = ({ editProfile }: editProfileMutation) => {
    if (editProfile.ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment EditedUser on User {
            email
            verified
          }
        `,
        data: {
          email: getValues().email,
          verified:
            userData.me.email !== getValues().email
              ? false
              : userData.me.verified,
        },
      });
    }
  };

  const onError = () => {};

  const [editProfile, { loading }] = useMutation<
    editProfileMutation,
    editProfileMutationVariables
  >(EDIT_PROFILE, { onCompleted, onError });

  const onSubmit = (data: editProfileMutationVariables) => {
    const inputs: editProfileMutationVariables = {};
    if (data.email !== userData?.me.email && data.email) {
      inputs.email = data.email;
    }
    if (data.password) {
      inputs.password = data.password;
    }

    editProfile({ variables: inputs });
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit profile</h4>
      <p>your role is {userData?.me.role}</p>
      <form
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          name="email"
          className="text-input"
          placeholder="email"
          ref={register}
        />
        <input
          name="password"
          type="password"
          className="text-input"
          placeholder="password"
          ref={register}
        />
        <FormButton
          loading={loading}
          disabled={!formState.isValid}
          label={'Save profile'}
        />
      </form>
    </div>
  );
};
