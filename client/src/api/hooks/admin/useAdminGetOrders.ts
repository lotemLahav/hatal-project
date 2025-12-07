import { useState } from "react";
import api from "../..";
import Swal from "sweetalert2";
import { FullOrder } from "../../../utils/types";

export const useAdminGetOrders = () => {

    const [orders, setOrders] = useState<FullOrder[]>([]);

    const fetchAdminOrders = async (): Promise<FullOrder[] | undefined> => {
        try {
            const res = await api.admin().getAllOrders();
            setOrders(res.data); // optional: update state
            return res.data;      // return the data to the caller
        } catch (error: unknown) {
            Swal.fire("Oops", "Cannot get orders", "error");
            console.error(error);
            return undefined;    // explicitly return undefined on error
        }
    };

    return { orders, fetchAdminOrders };
};