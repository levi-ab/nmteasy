import { createContext } from "react";
import IUser from "./models/user";

export interface AuthInterface {
  user: IUser | null;
  token: string;
  signIn: () => void;
  signOut: () => void;
  loaded: boolean | null;
}

export const defaultUserAuthValue: AuthInterface = {
  user: null,
  token: "",
  signIn: () => {},
  signOut: () => {},
  loaded: null,
};

const UserContext = createContext(defaultUserAuthValue);

export default UserContext;