import { useState } from "react";
import Swal from "sweetalert2";
import api from "../..";
import { User, UserAuth } from "../../../utils/types";
import { useUser } from "../../../context/userContext";

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userCallback } = useUser();

  const getUser = async (userData: UserAuth) => {
    try {
      const res = await api.users().getUser(userData);

      setUser(res.data);
      userCallback(res.data.username)(); 
      localStorage.setItem('access_token', res.data.token.access_token);
      return res.data;
    } catch (error) {
      Swal.fire("Oops!", "Could not find user. Try again.", "error");
      throw error;
    }
  };

  return { user, getUser };
};
