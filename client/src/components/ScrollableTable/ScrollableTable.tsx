/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { Table } from "react-bootstrap";
import { FullOrder, OrderStatus, ProductProps, TableItem } from "../../utils/types";
import Swal from "sweetalert2";
import { useAdminDeleteProduct } from "../../api/hooks/admin/useAdminDeleteProduct";
import { useAdminUpdateStatus } from "../../api/hooks/admin/useAdminUpdateStatus";
import { useAdminUpdateAvalibleProduct } from "../../api/hooks/admin/useAdminUpdateAvalibleProduct";
import { useGetOrderItemsByOrder } from "../../api/hooks/orderItem/useGetOrderItemsByOrder";
import { MultipleCartItems } from "../MultipleCartItem";
import { useEffect, useState } from "react";

interface ScrollableTableProps {
    items: TableItem;
    onRefetch: () => void;
}

export const ScrollableTable = ({ items, onRefetch }: ScrollableTableProps) => {
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<FullOrder | null>(null);
    const [orderItems, setOrderItems] = useState<ProductProps[]>([]);
    const { fetchOrderItemsByOrder } = useGetOrderItemsByOrder();

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
    const adminAvalibleProduct = useAdminUpdateAvalibleProduct();

    useEffect(() => {
        if (shouldRefetch) {
            onRefetch();
            setShouldRefetch(false);
        }
    }, [shouldRefetch, onRefetch]);

    const clickedRow = async (item: FullOrder | ProductProps) => {
        if (items.type === 'product') {
            const product = item as ProductProps;
            if (product.is_avalible) {
                Swal.fire({
                    title: "Are you Sure?",
                    text: "Sure you want to delete this product?",
                    icon: "question",
                    showDenyButton: true,
                    confirmButtonText: "Delete",
                    denyButtonText: `Don't Delete`,
                    confirmButtonColor: '#1E3D5A',
                    denyButtonColor: '#F39C42'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await adminDeleteProduct(product);
                            Swal.fire({
                                title: "Deleted!",
                                icon: "success",
                                confirmButtonColor: '#F39C42'
                            });
                            setShouldRefetch(true);
                        } catch (error) {
                            Swal.fire({
                                title: "There's a problem!",
                                text: "Can't Delete Product",
                                icon: "error",
                                confirmButtonColor: '#1E3D5A'
                            });
                            console.error(error);
                        }
                    }
                });
            } else {
                Swal.fire({
                    title: "Are you Sure?",
                    text: "Sure you want to make this product available?",
                    icon: "question",
                    showDenyButton: true,
                    confirmButtonText: "Update",
                    denyButtonText: `Don't Update`,
                    confirmButtonColor: '#F39C42',
                    denyButtonColor: '#1E3D5A'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await adminAvalibleProduct(product);
                            Swal.fire({
                                title: "Product Available!",
                                icon: "success",
                                confirmButtonColor: '#F39C42'
                            });
                            setShouldRefetch(true);
                        } catch (error) {
                            Swal.fire({
                                title: "There's a problem!",
                                text: "Can't Make Product Available",
                                icon: "error",
                                confirmButtonColor: '#1E3D5A'
                            });
                            console.error(error);
                        }
                    }
                });
            }
        } else if (items.type === 'order') {
            const order = item as FullOrder;
            try {
                const data: ProductProps[] = await fetchOrderItemsByOrder(order.id);
                setOrderItems(data);
                setSelectedOrder(order);
                setIsModalOpen(true);
            } catch (error) {
                console.error("Failed to fetch order items:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to load order items",
                    icon: "error",
                    confirmButtonColor: '#1E3D5A'
                });
            }
        }
    }

    const clickStatus = (e: React.MouseEvent, item: FullOrder) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Select a new Status',
            input: 'radio',
            inputOptions: {
                option1: 'in the making',
                option2: 'on the way',
                option3: 'closed',
            },
            showCancelButton: true,
            confirmButtonColor: '#F39C42',
            cancelButtonColor: '#1E3D5A'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const selectedStatus = statusMap[result.value as keyof typeof statusMap];
                    await adminUpdateStatus(item.id, selectedStatus);
                    Swal.fire({
                        title: "Updated!",
                        icon: "success",
                        confirmButtonColor: '#F39C42'
                    });
                    setShouldRefetch(true);
                } catch (error) {
                    Swal.fire({
                        title: "There's a problem!",
                        text: "Can't Update status",
                        icon: "error",
                        confirmButtonColor: '#1E3D5A'
                    });
                    console.error(error);
                }
            }
        });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
        setOrderItems([]);
    }

    if (!items || !items.data || items.data.length === 0) {
        return <p style={{ padding: "10px" }}>No data to display.</p>;
    }

    return (
        <>
            <Table striped bordered hover responsive>
                <thead style={{ backgroundColor: '#1E3D5A', color: '#fff' }}>
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
                                    ) : key === 'status' ? (
                                        <div style={{ position: 'relative' }}>
                                            <span>{field}</span>

                                            <i
                                                className="bi bi-arrow-down-left-square-fill"
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '0',
                                                    left: '0',
                                                    fontSize: '1rem'
                                                }}
                                                onClick={(event) => clickStatus(event, item as FullOrder)}
                                            ></i>
                                        </div>
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
                                    ) : typeof field === "string" && !isNaN(Date.parse(field)) ? (
                                        new Date(field).toLocaleDateString()
                                    ) : (field)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {isModalOpen && selectedOrder && (
                <div
                    className="modal fade show d-block"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    role="dialog"
                    onClick={handleCloseModal}
                >
                    <div
                        className="modal-dialog modal-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: '#1E3D5A', color: '#fff' }}>
                                <h5 className="modal-title">Order #{selectedOrder.id}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body d-flex justify-content-center align-items-center">
                                <MultipleCartItems productProps={orderItems} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};