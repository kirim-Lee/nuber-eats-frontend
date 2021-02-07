import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { formatDiagnosticsWithColorAndContext } from 'typescript';
import { FormButton } from '../../components/form-button';
import {
  createDish,
  createDishVariables,
} from '../../__generated__/createDish';
import { MY_RESTAURANT_QUERY } from './my-restaurant';

type ParamType = { id: string };

const CREATE_DISH_MUTATION = gql`
  mutation createDish(
    $name: String!
    $price: Int!
    $description: String!
    $options: [DishOptionInputType!]
    $restaurantId: Int!
  ) {
    createDish(
      name: $name
      price: $price
      description: $description
      options: $options
      restaurantId: $restaurantId
    ) {
      ok
      error
    }
  }
`;

interface IForm extends Omit<createDishVariables, 'restaurantId' | 'options'> {}

export const AddDish = () => {
  const history = useHistory();
  const { id } = useParams<ParamType>();

  const onCompleted = () => {
    history.goBack();
  };

  const [createDish, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: MY_RESTAURANT_QUERY, variables: { id: Number(id) } },
    ],
  });

  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: 'onChange',
  });

  const onSubmit = (values: IForm) => {
    createDish({
      variables: {
        ...values,
        price: Number(values.price),
        restaurantId: Number(id),
      },
    });
  };

  return (
    <div>
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <div className="mx-auto w-full max-w-screen-sm">
        <h4 className="text-4xl font-medium">Add Dish</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        >
          <input
            className="text-input"
            type="text"
            name="name"
            placeholder="name"
            ref={register({ required: 'Name is required' })}
          />
          <input
            className="text-input"
            type="number"
            name="price"
            placeholder="price"
            ref={register({ required: 'price is required' })}
          />
          <input
            className="text-input"
            type="text"
            name="description"
            placeholder="description"
            ref={register({
              required: 'description is required',
              minLength: {
                value: 5,
                message: 'description need more 5 charactors',
              },
            })}
          />
          <FormButton
            label="Create Add"
            loading={loading}
            disabled={!formState.isValid}
          />
        </form>
      </div>
    </div>
  );
};
