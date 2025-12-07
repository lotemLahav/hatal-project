/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ScrollableTable } from '../components/ScrollableTable';
import { AddProductForm } from '../components/AddProduct/AddProduct';
import { useAdminGetOrders } from '../api/hooks/admin/useAdminGetOrders';
import { FullOrder, ProductProps } from '../utils/types';
import Swal from 'sweetalert2';
import { useAdminGetProducts } from '../api/hooks/admin/useAdminGetProducts';

export const Admin = () => {
    const { fetchAdminOrders } = useAdminGetOrders();
    const { fetchAdminProducts } = useAdminGetProducts();
    const [key, setKey] = useState('products');
    const [orders, setOrders] = useState<FullOrder[]>([]);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    useEffect(() => {
        if (key === "products") {
            handleProducts();
        } else if (key === "orders") {
            handleOrders();
        }
    }, [key]);

    const handleOrders = async () => {
        try {
            const res = await fetchAdminOrders();
            if (res) {
                setOrders(res);
            }
        } catch (error: unknown) {
            Swal.fire("There's a problem!", "Can't get Orders", "error");
            console.error(`${error} couldn't get Order.`);
        }
    }

    const handleProducts = async () => {
        try {
            const res = await fetchAdminProducts();
            if (res) {
                setProducts(res);
            }
        } catch (error: unknown) {
            Swal.fire("There's a problem!", "Can't get Products", "error");
            console.error(`${error} couldn't get Products.`);
        }
    }

    return (
        <>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k as string)}
                className="mb-3 p-2"
                style={{ backgroundColor: "#1E3D5A" }}
            >
                <Tab eventKey="products" title="Products">
                    <div className='p-4'>
                        <button 
                            type="button" 
                            className="btn btn-primary btn-lg" 
                            onClick={() => setShowAddProductModal(true)}
                        >
                            Add Product
                        </button>
                    </div>
                    <ScrollableTable
                        items={{ type: 'product', data: products }}
                        onRefetch={handleProducts}
                    />
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <ScrollableTable
                        items={{ type: 'order', data: orders }}
                        onRefetch={handleOrders}
                    />
                </Tab>
            </Tabs>

            <AddProductForm
                show={showAddProductModal}
                onHide={() => setShowAddProductModal(false)}
                onProductAdded={handleProducts}
            />
        </>
    );
}