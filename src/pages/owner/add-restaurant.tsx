import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { FormButton } from '../../components/form-button';
import { FormError } from '../../components/form-error';
import {
  createRestaurantMutation,
  createRestaurantMutationVariables,
} from '../../__generated__/createRestaurantMutation';
import { MY_RESTAURANTS_QUERY } from './my-restaurants';

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
      id
    }
  }
`;

type FormValue = createRestaurantMutationVariables & {
  file?: FileList;
};

const initialValue: FormValue = {
  name: '',
  address: '',
  coverImage: '',
  categoryName: '',
};

export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();

  const onCompleted = (data: createRestaurantMutation) => {
    if (data?.createRestaurant?.ok) {
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      const { name, address, coverImage, categoryName } = getValues();

      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult?.myRestaurants,
            results: [
              {
                name,
                address,
                coverImage,
                category: { name: categoryName, __typename: 'Category' },
                id: data.createRestaurant.id,
                isPromote: false,
                __typename: 'Restaurant',
              },

              ...queryResult?.myRestaurants.results,
            ],
          },
        },
      });

      history.push('/');
    }
  };

  const onError = (e: any) => {
    console.log(e);
  };

  const [createRestaurant, { data, loading, error }] = useMutation<
    createRestaurantMutation,
    createRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    onError,
    // refetchQueries: [{ query: MY_RESTAURANTS_QUERY }],
  });

  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
  } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: initialValue,
  });

  const onSubmit = async (values: FormValue) => {
    try {
      if (values.file) {
        const form = new FormData();
        form.append('file', values?.file[0]);

        setUploading(true);

        const request = await fetch('http://localhost:4000/uploads', {
          method: 'POST',
          body: form,
        });
        const res = await request.json();

        setValue('coverImage', res.url || '');
        values.coverImage = res.url || '';
        delete values.file;

        createRestaurant({ variables: values });

        setUploading(false);
      }
    } catch (e) {
      console.log(e);
    }
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
            ref={register({ required: 'Name is required', minLength: 5 })}
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
          <input type="file" ref={register} name="file" accept="image/*" />
          <FormButton
            label="Create Restaurant"
            disabled={loading || uploading || !formState.isValid}
            loading={loading || uploading}
          />
          {data?.createRestaurant.error && (
            <FormError errorMessage={data.createRestaurant.error} />
          )}
          {error?.message && <FormError errorMessage={error.message} />}
        </form>
      </div>
    </div>
  );
};
