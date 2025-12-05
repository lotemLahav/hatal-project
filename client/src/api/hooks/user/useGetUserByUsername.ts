import { useState } from "react";
import { FullUser } from "../../../utils/types";
import api from "../..";
import Swal from "sweetalert2";

export const useGetUserByUsername = () => {
  const [user, setUser] = useState<FullUser | null>(null);

  const fetchUserByUsername = async (username: string) => {
    try {
      const response = await api.users().getUserByUsername(username);
      setUser(response.data);
      return response.data;
    } catch (error: unknown) {
      Swal.fire("Oops", "cannot show User", "error");
      throw error;
    }
  };

  return { user, fetchUserByUsername };
};