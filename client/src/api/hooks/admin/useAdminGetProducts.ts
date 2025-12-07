import api from "../..";
import Swal from "sweetalert2";

export const useAdminGetProducts = () => {

    const fetchAdminProducts = async () => {
      try {
        return ((await api.admin().getAllProducts()).data);
      } catch (error: unknown) {
        Swal.fire("Oops", "cannot get Products", "error");
      }
    };

    fetchAdminProducts();

  return { fetchAdminProducts};
};