import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { FormButton } from '../components/form-button';
import { FormError } from '../components/form-error';
import {
  createAccountMutationVariables,
  createAccountMutation,
} from '../__generated__/createAccountMutation';
import { userRole } from '../__generated__/globalTypes';

export const CREATE_ACCOUNT = gql`
  mutation createAccountMutation(
    $email: String!
    $password: String!
    $role: userRole!
  ) {
    createAccount(email: $email, password: $password, role: $role) {
      ok
      error
    }
  }
`;

type FormType = createAccountMutationVariables;

export const CreateAccount = () => {
  const history = useHistory();
  const onCompleted = ({
    createAccount: { ok, error },
  }: createAccountMutation) => {
    if (ok) {
      history.push('/');
    }
  };

  const onError = () => null;

  const [
    createAccount,
    { loading, error: fetchError, data: createAccountResult },
  ] = useMutation<createAccountMutation, FormType>(CREATE_ACCOUNT, {
    onCompleted,
    onError,
  });

  const { register, handleSubmit, errors, formState } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: { role: userRole.CLIENT },
  });

  const onSubmit = (data: FormType) => {
    createAccount({ variables: { ...data } });
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-32">
      <Helmet>
        <title>Create account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm px-5">
        <h3 className="text-3xl scale-125 text-center mb-10 font-medium">
          <span>Nuber</span> <span className=" text-lime-400">Eats</span>
        </h3>
        <h4 className="w-full text-left text-2xl mb-5 font-thin">
          create account
        </h4>
        <form className="grid gap-3 mt-5 " onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="text-input"
            ref={register({
              required: true,
              pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            })}
          />
          {errors.email?.type === 'required' && (
            <FormError errorMessage="email is required" />
          )}
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage="email pattern is not matched" />
          )}
          <input
            type="password"
            name="password"
            placeholder="password"
            className="text-input"
            ref={register({ required: true })}
          />
          {errors.password?.type === 'required' && (
            <FormError errorMessage="password is required" />
          )}
          <select
            name="role"
            ref={register}
            className="select"
            data-testid="role-select"
          >
            {Object.keys(userRole).map((key) => {
              return (
                <option value={key} key={key.toString()}>
                  {key[0]}
                  {key.toLowerCase().substr(1)}
                </option>
              );
            })}
          </select>
          <FormButton
            label="create account"
            disabled={loading || !formState.isValid}
            loading={loading}
          />
          {createAccountResult?.createAccount?.error && (
            <FormError errorMessage={createAccountResult.createAccount.error} />
          )}
          {fetchError?.message && (
            <FormError errorMessage={fetchError.message} />
          )}
        </form>
        <div className="text-sm text-center mt-3">
          Already have account ?{' '}
          <Link to="/" className="text-lime-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
