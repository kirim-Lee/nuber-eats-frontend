import { gql, useMutation } from '@apollo/client';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

export const Login = () => {
  const onCompleted = ({ login: { ok, token } }: loginMutation) => {
    if (ok) {
      console.log(token);
    } else {
    }
  };
  const onError = () => null;
  const loginMutationResult = { onCompleted, onError };
  const [login, { data: loginResult, loading: loginLoading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, loginMutationResult);
  const { register, errors, handleSubmit } = useForm<loginMutationVariables>();

  const onSubmit: SubmitHandler<loginMutationVariables> = (variables) => {
    login({ variables });
  };
  const onInvalid: SubmitErrorHandler<loginMutationVariables> = () => {};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Nuber eats Login</h3>
        <form
          className="grid gap-3 mt-5 px-5"
          onSubmit={handleSubmit(onSubmit, onInvalid)}
        >
          <input
            placeholder="email"
            className="text-input"
            type="email"
            name="email"
            ref={register({ required: 'Email is required' })}
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            placeholder="password"
            className="text-input"
            type="password"
            name="password"
            ref={register({ required: 'Password is required' })}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <button
            type="submit"
            className="button-black mt-3"
            disabled={loginLoading}
          >
            {loginLoading ? 'loading...' : 'login'}
          </button>
          {loginResult?.login?.error && (
            <FormError errorMessage={loginResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
