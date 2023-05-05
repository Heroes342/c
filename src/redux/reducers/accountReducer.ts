import {
  ACCOUNT_ACTIONS,
  Account,
  AccountAction,
  AccountProps,
} from "../actions/accountActions";

const initialState: AccountProps = {
  account: {
    email: "",
    password: "",
    name: "",
    city: "",
    phone: "",
    nat: "",
    image: "",
    dob: null,
    isLogged: false,
  },
};

const accountReducer = (state = initialState, action: AccountAction) => {
  switch (action.type) {
    case ACCOUNT_ACTIONS.ADD_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case ACCOUNT_ACTIONS.LOGIN_ACCOUNT:
      if (
        state.account?.email === action.payload.email &&
        state.account?.password === action.payload.password
      )
        return {
          ...state,
          account: {
            ...state.account,
            isLogged: true,
          },
        };
    case ACCOUNT_ACTIONS.LOGOUT_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          isLogged: false,
        },
      };
    case ACCOUNT_ACTIONS.DELETE_ACCOUNT:
      return {
        ...state,
        account: state,
      };
    case ACCOUNT_ACTIONS.EDIT_ACCOUNT:
      if (action.payload.password === ""){
        action.payload.password = state.account.password;
      }
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
