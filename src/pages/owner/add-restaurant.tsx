import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FormButton } from '../../components/form-button';
import {
  createRestaurantMutation,
  createRestaurantMutationVariables,
} from '../../__generated__/createRestaurantMutation';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurantMutation(
    $name: String!
    $address: String!
    $coverImage: String!
    $categoryName: String!
  ) {
    createRestaurant(
      name: $name
      address: $address
      coverImage: $coverImage
      categoryName: $categoryName
    ) {
      ok
      error
    }
  }
`;

type FormValue = createRestaurantMutationVariables;

const initialValue: FormValue = {
  name: '',
  address: '',
  coverImage: '',
  categoryName: '',
};

export const AddRestaurant = () => {
  const [createRestaurant, { data, error, loading }] = useMutation<
    createRestaurantMutation,
    createRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION);

  const { register, handleSubmit } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: initialValue,
  });

  const onSubmit = (values: FormValue) => {
    console.log(values);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Create Restaurant | Nuber Eats</title>
      </Helmet>
      <div className="mx-auto w-full max-w-screen-sm">
        <h4 className="w-full text-left text-2xl mb-5 font-thin">
          Add Restaurant
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5">
          <input
            type="text"
            className="text-input"
            name="name"
            placeholder="restaurant name"
            ref={register({ required: 'Name is required' })}
          />
          <input
            type="text"
            className="text-input"
            name="address"
            placeholder="address name"
            ref={register({ required: 'address is required' })}
          />
          <input
            type="text"
            className="text-input"
            name="categoryName"
            placeholder="category name"
            ref={register({ required: 'category is required' })}
          />
          <FormButton
            label="Create Restaurant"
            disabled={loading}
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};
