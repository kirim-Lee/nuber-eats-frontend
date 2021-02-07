/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRestaurantMutation
// ====================================================

export interface createRestaurantMutation_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
}

export interface createRestaurantMutation {
  createRestaurant: createRestaurantMutation_createRestaurant;
}

export interface createRestaurantMutationVariables {
  name: string;
  address: string;
  coverImage: string;
  categoryName: string;
}
