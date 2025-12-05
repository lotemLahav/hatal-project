import { createContext } from "react";
import { User } from "../../utils/types";

export interface UserContextType {
  username: User["username"] | null;
  token: User["token"] | null;
  userCallback: (username: User["username"]) => () => void;
  tokenCallback: (token: User["token"]) => () => void;
  resetUsername: () => void;
}

export const UserContext =
  createContext<UserContextType | null>(null);
