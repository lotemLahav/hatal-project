/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { Table } from "react-bootstrap";
import { FullOrder, OrderStatus, ProductProps, TableItem } from "../../utils/types";
import Swal from "sweetalert2";
import { useAdminDeleteProduct } from "../../api/hooks/admin/useAdminDeleteProduct";
import { useAdminUpdateStatus } from "../../api/hooks/admin/useAdminUpdateStatus";
import { useEffect, useState } from "react";

interface ScrollableTableProps {
    items: TableItem;
    onRefetch: () => void; 
}

export const ScrollableTable = ({ items, onRefetch }: ScrollableTableProps) => {
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const isImageUrl = (url: string) => {
        if (typeof url !== 'string') return false;
        return /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url);
    };

    const statusMap = {
        option1: OrderStatus.IN_THE_MAKING,
        option2: OrderStatus.ON_THE_WAY,
        option3: OrderStatus.CLOSED,
    };

    const adminDeleteProduct = useAdminDeleteProduct();
    const adminUpdateStatus = useAdminUpdateStatus();

    useEffect(() => {
        if (shouldRefetch) {
            onRefetch();
            setShouldRefetch(false);
        }
    }, [shouldRefetch, onRefetch]);

    const clickedRow = (item: FullOrder | ProductProps) => {
        if (items.type === 'product') {
            Swal.fire({
                title: "Are you Sure?",
                text: "Sure you want to delete this product?",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't Delete`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await adminDeleteProduct(item as ProductProps);
                        Swal.fire("Deleted!", "", "success");
                        setShouldRefetch(true);
                    } catch (error) {
                        Swal.fire("There's a problem!", "Can't Delete Product", "error");
                        console.error(error);
                    }
                }
            });
        } else if (items.type === 'order') {
            Swal.fire({
                title: 'Select a new Status',
                input: 'radio',
                inputOptions: {
                    option1: 'in the making',
                    option2: 'on the way',
                    option3: 'closed',
                },
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const selectedStatus = statusMap[result.value as keyof typeof statusMap];
                        await adminUpdateStatus(item.id, selectedStatus);
                        Swal.fire("Updated!", "", "success");
                        setShouldRefetch(true);
                    } catch (error) {
                        Swal.fire("There's a problem!", "Can't Update status", "error");
                        console.error(error);
                    }
                }
            });
        }
    }

    if (!items || !items.data || items.data.length === 0) {
        return <p style={{ padding: "10px" }}>No data to display.</p>;
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    {Object.keys(items.data[0]).map((key) => (
                        <th key={key}>
                            {key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {items.data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.entries(item).map(([key, field], cellIndex) => (
                            <td
                                key={cellIndex}
                                onClick={() => clickedRow(item)}
                                style={{
                                    maxWidth: '200px',
                                    wordBreak: 'break-word',
                                    whiteSpace: 'normal',
                                    cursor: 'pointer'
                                }}
                            >
                                {typeof field === 'boolean' ? (
                                    field ? '✓' : '✗'
                                ) : isImageUrl(field) ? (
                                    <img
                                        src={field}
                                        alt="img"
                                        style={{
                                            maxWidth: '100px',
                                            maxHeight: '60px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                ) : (
                                    field
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};