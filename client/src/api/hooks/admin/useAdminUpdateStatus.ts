/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../..";
import Swal from "sweetalert2";
import { FullOrder } from "../../../utils/types";

export const useAdminUpdateStatus = () => {

    const adminUpdateStatus = async (id: number, status: string): Promise<FullOrder | undefined> => {
        try {
            const res = await api.admin().updateOrderStatus(id, status);
            return res.data;    
        } catch (error: unknown) {
            Swal.fire("Oops", "Cannot change status", "error");
            console.error(error);
            return undefined;  
        }
    };

    return adminUpdateStatus;
};