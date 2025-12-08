/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../..";
import Swal from "sweetalert2";
import { ProductProps } from "../../../utils/types";

export const useAdminDeleteProduct = () => {

    const adminDeleteProduct = async (product: ProductProps): Promise<ProductProps | undefined> => {
        try {
            const res = await api.admin().upadateDeleteProduct(product);
            return res.data;    
        } catch (error: unknown) {
            Swal.fire("Oops", "Cannot delete Product", "error");
            console.error(error);
            return undefined;  
        }
    };

    return adminDeleteProduct;
};