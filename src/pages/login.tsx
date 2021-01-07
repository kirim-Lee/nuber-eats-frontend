import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

type LoginForm = {
  email: string;
  password: string;
};

export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {};
  const onInvalid: SubmitErrorHandler<LoginForm> = () => {};
  console.log(errors);
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Login</h3>
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
          {errors.email && (
            <span className="text-sm text-red-500 text-right">
              {errors.email?.message}
            </span>
          )}
          <input
            placeholder="password"
            className="text-input"
            type="password"
            name="password"
            ref={register({ required: 'Password is required' })}
          />
          {errors.password && (
            <span className="text-sm text-red-500 text-right">
              {errors.password?.message}
            </span>
          )}
          <button type="submit" className="button-black mt-3">
            login
          </button>
        </form>
      </div>
    </div>
  );
};
