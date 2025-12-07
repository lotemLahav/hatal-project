/* eslint-disable react/jsx-key */
import { Table } from "react-bootstrap";
import { TableItem } from "../../utils/types";

interface ScrollableTableProps {
    items: TableItem;
}

export const ScrollableTable = ({ items }: ScrollableTableProps) => {
    const isImageUrl = (url: string) => {
        if (typeof url !== 'string') return false;
        return /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url);
    };

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
                    <tr key={rowIndex} style={{ height: '50px' }}>
                        {Object.values(item).map((field, cellIndex) => (
                            <td
                                key={cellIndex}
                                style={{
                                    maxWidth: '200px',         
                                    wordBreak: 'break-word',  
                                    whiteSpace: 'normal',     
                                }}
                            >
                                {isImageUrl(field) ? (
                                    <img
                                        src={field}
                                        alt="img"
                                        style={{ maxWidth: '100px', maxHeight: '60px', objectFit: 'contain' }}
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
