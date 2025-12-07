import { useState } from "react";
import api from "../..";
import Swal from "sweetalert2";
import { FullOrder } from "../../../utils/types";

export const useAdminGetOrders = () => {

    const [orders, setOrders] = useState<FullOrder[]>([]);

    const fetchAdminOrders = async (): Promise<FullOrder[] | undefined> => {
        try {
            const res = await api.admin().getAllOrders();
            setOrders(res.data); 
            return res.data; 
        } catch (error: unknown) {
            Swal.fire("Oops", "Cannot get orders", "error");
            console.error(error);
            return undefined;  
        }
    };

    return { orders, fetchAdminOrders };
};