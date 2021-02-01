/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchRestaurant
// ====================================================

export interface searchRestaurant_searchRestaurant_result_category {
  __typename: "Category";
  id: number;
  name: string;
  icon: string | null;
}

export interface searchRestaurant_searchRestaurant_result {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: searchRestaurant_searchRestaurant_result_category;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurant_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  result: searchRestaurant_searchRestaurant_result[] | null;
}

export interface searchRestaurant {
  searchRestaurant: searchRestaurant_searchRestaurant;
}

export interface searchRestaurantVariables {
  query: string;
  page?: number | null;
}
