/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: restaurant
// ====================================================

export interface restaurant_restaurant_result_category {
  __typename: "Category";
  id: number;
  name: string;
  icon: string | null;
  slug: string;
}

export interface restaurant_restaurant_result {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restaurant_restaurant_result_category;
  address: string;
  isPromoted: boolean;
}

export interface restaurant_restaurant {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  result: restaurant_restaurant_result | null;
}

export interface restaurant {
  restaurant: restaurant_restaurant;
}

export interface restaurantVariables {
  id: number;
}
