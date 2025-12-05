import { FC, useState } from "react";
import { UserContext } from "./UserContex";
import { User } from "../../utils/types";

export const UserProvider: FC<{
  children: JSX.Element[] | JSX.Element;
}> = ({ children }) => {
  const [username, setUsername] = useState<User["username"] | null>(
    null
  );

  const userCallback = (username: User["username"]) => () =>
    setUsername(username);

  const resetUsername = () => setUsername(null);

  return (
    <UserContext.Provider
      value={{
        username,
        userCallback,
        resetUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
