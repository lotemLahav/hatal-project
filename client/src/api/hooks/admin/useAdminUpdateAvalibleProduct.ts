/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../..";
import Swal from "sweetalert2";
import { ProductProps } from "../../../utils/types";

export const useAdminUpdateAvalibleProduct = () => {

    const adminUpdateAvalibleProduct = async (product: ProductProps): Promise<ProductProps | undefined> => {
        try {
            const res = await api.admin().updateAvalibleProduct(product);
            return res.data;    
        } catch (error: unknown) {
            Swal.fire("Oops", "Cannot turn Product Avalible", "error");
            console.error(error);
            return undefined;  
        }
    };

    return adminUpdateAvalibleProduct;
};