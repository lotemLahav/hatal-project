import { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { usePostProduct } from '../../api/hooks/admin/usePostProduct';

interface AddProductFormProps {
    show: boolean;
    onHide: () => void;
    onProductAdded: () => void;
}

export const AddProductForm = ({ show, onHide, onProductAdded }: AddProductFormProps) => {
    const { postProduct } = usePostProduct();

    const [formData, setFormData] = useState({
        name: '',
        genre: '',
        production: '',
        description: '',
        price: '',
        duration: '',
        image: null as File | null
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                image: e.target.files![0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.genre || !formData.production ||
            !formData.description || !formData.price || !formData.duration || !formData.image) {
            Swal.fire('Error', 'Please fill in all fields and upload an image', 'error');
            return;
        }

        try {
            // Convert image to base64
            const base64Image = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(formData.image!);
            });

            const productData = {
                name: formData.name,
                genre: formData.genre,
                production: formData.production,
                description: formData.description,
                price: parseFloat(formData.price),
                duration: formData.duration,
                is_avalible: true,
                image: base64Image // Send as base64
            };

            await postProduct(productData);
            Swal.fire('Success!', 'Product added successfully', 'success');
            onProductAdded();
            onHide();

            // Reset form
            setFormData({
                name: '',
                genre: '',
                production: '',
                description: '',
                price: '',
                duration: '',
                image: null
            });
        } catch (error) {
            Swal.fire('Error!', 'Could not add product', 'error');
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <div className='d-flex justify-content-between'>
                            <div>
                                <Form.Label className='p-2'>Genre</Form.Label>
                                <Form.Select required
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                >
                                    <option value="comedy">comedy</option>
                                    <option value="drama">drama</option>
                                    <option value="tragedy">tragedy</option>
                                    <option value="romance">ramance</option>
                                    <option value="jukebox">jukebox</option>
                                </Form.Select>
                            </div>
                            <div>
                                <Form.Label className='p-2'>Production</Form.Label>
                                <Form.Select required
                                    name="production"
                                    value={formData.production}
                                    onChange={handleInputChange}
                                >
                                    <option value="broadway">broadway</option>
                                    <option value="off broadway">off broadway</option>
                                    <option value="west end">west end</option>
                                </Form.Select>
                            </div>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required
                            as="textarea"
                            name="description"
                            rows={3}
                            placeholder="Product Description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control required
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Duration (HH:MM:SS)</Form.Label>
                                <Form.Control required
                                    type="text"
                                    name="duration"
                                    placeholder="02:30:00"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control required
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Product
                </Button>
            </Modal.Footer>
        </Modal >
    );
};