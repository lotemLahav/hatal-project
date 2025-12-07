/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { Table } from "react-bootstrap";
import { FullOrder, ProductProps, TableItem } from "../../utils/types";
import Swal from "sweetalert2";
import { useAdminDeleteProduct } from "../../api/hooks/admin/useAdminDeleteProduct";

interface ScrollableTableProps {
    items: TableItem;
}

export const ScrollableTable = ({ items }: ScrollableTableProps) => {
    const isImageUrl = (url: string) => {
        if (typeof url !== 'string') return false;
        return /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url);
    };

    const adminDeleteProduct = useAdminDeleteProduct();

    const clickedRow = (item: FullOrder | ProductProps) => {
        if (items.type === 'product') {
            Swal.fire({
                title: "?Are you Sure",
                text: "?sure you want to deleate this product",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't Delete`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await adminDeleteProduct(item as ProductProps);
                        Swal.fire("Deleted!", "", "success");
                        items.data.filter(product => product.id !== item.id);
                    } catch (error) {
                        Swal.fire("There's a problem!", "Can't Delete Product", "error");
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
