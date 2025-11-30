import { useState } from "react";
import Swal from "sweetalert2";
import api from "..";
import { User } from "../../utils/types";
import { useUser } from "../../context/userContext/useUser";

export const usePostUser = () => {
  const [createdUser, setCreatedUser] = useState<User | null>(null);
  const { userCallback } = useUser();

  const postUser = async (userData: Partial<User>) => {
    try {
      const res = await api.users().create(userData);

      setCreatedUser(res.data);
      userCallback(res.data.username)(); 

      return res.data;
    } catch (error) {
      Swal.fire("Oops!", "Could not create user. Try again.", "error");
      throw error;
    }
  };

  return { createdUser, postUser };
};
