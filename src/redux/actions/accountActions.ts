import { Data } from "../../models/Data";

export type Account = Record<"email" | "password" | "name" | "city" | "phone" | "nat" | "image", string> & Record<"dob", Date | null> &
  Record<"isLogged", boolean>

export interface AccountProps {
  account: Account;
}

export interface AccountAction {
  type: ACCOUNT_ACTIONS;
  payload: Account;
}

export enum ACCOUNT_ACTIONS {
  ADD_ACCOUNT = "ADD_ACCOUNT",
  LOGIN_ACCOUNT = "LOGIN_ACCOUNT",
  LOGOUT_ACCOUNT = "LOGOUT_ACCOUNT",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  EDIT_ACCOUNT = "EDIT_ACCOUNT"
}

export const signUp = (account: Account) => {
  return {
    type: ACCOUNT_ACTIONS.ADD_ACCOUNT,
    payload: account,
  };
};

export const login = (account: Account) => {
  return {
    type: ACCOUNT_ACTIONS.LOGIN_ACCOUNT,
    payload: account,
  };
};

export const edit = (account: Account) => {
  return {
    type: ACCOUNT_ACTIONS.EDIT_ACCOUNT,
    payload: account,
  };
};
export const logout = () => {
  return {
    type: ACCOUNT_ACTIONS.LOGOUT_ACCOUNT,
  };
};

export const deleteAccount = (account : Account) => {
  return {
    type: ACCOUNT_ACTIONS.DELETE_ACCOUNT,
    payload: account.email,
  };
};