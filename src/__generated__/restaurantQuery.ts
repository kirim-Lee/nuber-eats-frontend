/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: restaurantQuery
// ====================================================

export interface restaurantQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  icon: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantQuery_allCategories_categories[] | null;
}

export interface restaurantQuery_restaurants_results_category {
  __typename: "Category";
  id: number;
  name: string;
  icon: string | null;
  slug: string;
}

export interface restaurantQuery_restaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restaurantQuery_restaurants_results_category;
  address: string;
  isPromoted: boolean;
}

export interface restaurantQuery_restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: restaurantQuery_restaurants_results[] | null;
}

export interface restaurantQuery {
  allCategories: restaurantQuery_allCategories;
  restaurants: restaurantQuery_restaurants;
}

export interface restaurantQueryVariables {
  page?: number | null;
}
