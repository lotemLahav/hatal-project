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
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all fields and upload an image',
                icon: 'error',
                confirmButtonColor: '#1E3D5A'
            });
            return;
        }

        try {
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
                image: base64Image 
            };

            await postProduct(productData);
            Swal.fire({
                title: 'Success!',
                text: 'Product added successfully',
                icon: 'success',
                confirmButtonColor: '#F39C42'
            });
            onProductAdded();
            onHide();

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
            Swal.fire({
                title: 'Error!',
                text: 'Could not add product',
                icon: 'error',
                confirmButtonColor: '#1E3D5A'
            });
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#1E3D5A', color: '#fff', borderBottom: '3px solid #F39C42' }}>
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
                        <Row>
                            <Col md={6}>
                                <Form.Label>Genre</Form.Label>
                                <Form.Select required
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Genre</option>
                                    <option value="comedy">Comedy</option>
                                    <option value="drama">Drama</option>
                                    <option value="tragedy">Tragedy</option>
                                    <option value="romance">Romance</option>
                                    <option value="jukebox">Jukebox</option>
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label>Production</Form.Label>
                                <Form.Select required
                                    name="production"
                                    value={formData.production}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Production</option>
                                    <option value="broadway">Broadway</option>
                                    <option value="off broadway">Off Broadway</option>
                                    <option value="west end">West End</option>
                                    <option value="starkid">Starkid</option>
                                </Form.Select>
                            </Col>
                        </Row>
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
                <Button onClick={handleSubmit} style={{ backgroundColor: '#F39C42', borderColor: '#F39C42' }}>
                    Add Product
                </Button>
            </Modal.Footer>
        </Modal>
    );
};