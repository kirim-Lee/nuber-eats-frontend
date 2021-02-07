/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum userRole {
  CLIENT = "CLIENT",
  DELIVERY = "DELIVERY",
  OWNER = "OWNER",
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  extra?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
