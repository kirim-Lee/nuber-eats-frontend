/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_category_category {
  __typename: "Category";
  id: number;
  name: string;
  icon: string | null;
  slug: string;
  restaurantCount: number;
}

export interface category_category_restaurants_category {
  __typename: "Category";
  id: number;
  name: string;
  icon: string | null;
  slug: string;
}

export interface category_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: category_category_restaurants_category;
  address: string;
  isPromoted: boolean;
}

export interface category_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  category: category_category_category | null;
  restaurants: category_category_restaurants[] | null;
}

export interface category {
  category: category_category;
}

export interface categoryVariables {
  slug: string;
  page?: number | null;
}
