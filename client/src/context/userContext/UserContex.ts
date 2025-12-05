import { createContext } from "react";
import { User } from "../../utils/types";

export interface UserContextType {
  username: User["username"] | null;
  userCallback: (username: User["username"]) => () => void;
  resetUsername: () => void;
}

export const UserContext =
  createContext<UserContextType | null>(null);
