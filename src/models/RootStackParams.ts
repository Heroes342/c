import { Data } from "./Data";

type RootStackParams = {
  Home: { typology: string };
  Detail: {
    id?: string | undefined;
    name?: string | undefined;
    data?: Data;
  };
  HomeStack: undefined;
  Profile: undefined;
  Favorite: {
    love: boolean,
    bookmark: number
  };
  EditProfile: undefined;
  Homepage: undefined;
  SignUp: undefined;
  Login: undefined;
  Info: undefined;
  DrawerMenu: undefined;
};

export default RootStackParams;
