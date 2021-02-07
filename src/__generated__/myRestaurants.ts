/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myRestaurants
// ====================================================

export interface myRestaurants_myRestaurants_results_category {
  __typename: "Category";
  id: number;
  name: string;
  icon: string | null;
  slug: string;
}

export interface myRestaurants_myRestaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: myRestaurants_myRestaurants_results_category;
  address: string;
  isPromoted: boolean;
}

export interface myRestaurants_myRestaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  results: myRestaurants_myRestaurants_results[] | null;
}

export interface myRestaurants {
  myRestaurants: myRestaurants_myRestaurants;
}
