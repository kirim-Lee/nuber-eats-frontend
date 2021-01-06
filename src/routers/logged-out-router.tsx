import { isLoggedInVar } from '../apollo';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

const defaultValues = { email: 'email.com' };

export const LoggedOutRouter = () => {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    isLoggedInVar(true);
  };

  const onInvalid = (valid: FieldErrors<FormValues>) => {
    console.log(valid);
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <input
          name="email"
          type="email"
          placeholder="email"
          ref={register({
            required: true,
            validate: (value) => value === 'uthi1004@gmail.com',
          })}
        />
        {errors.email ? 'email is error' : ''}
        <input
          name="password"
          type="password"
          placeholder="password"
          ref={register}
        />
        <button
          type="submit"
          className="bg-yellow-300 text-white p-2 rounded-md"
        >
          Click to login
        </button>
      </form>
    </div>
  );
};
