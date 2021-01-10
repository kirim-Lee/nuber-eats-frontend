import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { createAccountMutationVariables } from '../__generated__/createAccountMutation';
import { userRole } from '../__generated__/globalTypes';

const CREATE_ACCOUNT = gql`
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
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const { register } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: { role: userRole.CLIENT },
  });

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-32">
      <Helmet>
        <title>Create account</title>
      </Helmet>
      <div className="w-full max-w-screen-sm px-5">
        <h3 className="text-3xl scale-125 text-center mb-10 font-medium">
          <span>Nuber</span> <span className=" text-lime-400">Eats</span>
        </h3>
        <h4 className="w-full text-left text-2xl mb-5 font-thin">
          create account
        </h4>
        <form className="grid gap-3 mt-5 ">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="text-input"
            ref={register}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="text-input"
            ref={register}
          />
          <select name="role" ref={register} className="select">
            {Object.keys(userRole).map((key) => {
              return (
                <option value={key} key={key.toString()}>
                  {key[0]}
                  {key.toLowerCase().substr(1)}
                </option>
              );
            })}
          </select>
        </form>
        <div className="text-sm text-center mt-3">
          Already have account ?{' '}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
