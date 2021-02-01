/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RestaurantPart
// ====================================================

export interface RestaurantPart_category {
  __typename: "Category";
  id: number;
  name: string;
  icon: string | null;
}

export interface RestaurantPart {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: RestaurantPart_category;
  address: string;
  isPromoted: boolean;
}
