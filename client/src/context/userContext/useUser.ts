import { useContext } from "react";
import { UserContext } from "./UserContex";

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error(
      "must log in to purchase"
    );
  }

  return user;
};
