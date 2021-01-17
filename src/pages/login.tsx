import { Helmet } from 'react-helmet';
import { gql, useMutation } from '@apollo/client';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormButton } from '../components/form-button';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
import { isLoggedInVar, authToken } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';

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
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      isLoggedInVar(true);
      authToken(token);
    }
  };

  const onError = () => null;

  const [
    login,
    { data: loginResult, error: fetchError, loading: loginLoading },
  ] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
    onCompleted,
    onError,
  });

  const {
    register,
    handleSubmit,
    errors,
    formState,
  } = useForm<loginMutationVariables>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<loginMutationVariables> = (variables) => {
    login({ variables });
  };
  const onInvalid: SubmitErrorHandler<loginMutationVariables> = () => {};

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-32">
      <Helmet>
        <title>Welcome to Nuber Eats!</title>
      </Helmet>
      <div className="w-full max-w-screen-sm px-5">
        <h3 className="text-3xl scale-125 text-center mb-10 font-medium">
          <span>Nuber</span> <span className=" text-lime-400">Eats</span>
        </h3>
        <h4 className="w-full text-left text-2xl mb-5 font-thin">
          welcome back
        </h4>
        <form
          className="grid gap-3 mt-5 "
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

          <FormButton
            label="login"
            disabled={loginLoading || !formState.isValid}
            loading={loginLoading}
          />

          {loginResult?.login?.error && (
            <FormError errorMessage={loginResult.login.error} />
          )}
          {fetchError?.message && (
            <FormError errorMessage={fetchError.message} />
          )}
        </form>
        <div className="text-sm text-center mt-3">
          New to Nuber ?{' '}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
