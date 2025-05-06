import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Container,
  Spinner,
} from "react-bootstrap";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    category_id: "",
    image: "",
    description: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };
  const handleSave = async () => {
    const cleanFormData = { ...formData };

    delete cleanFormData.description;

    const url = editingProduct
      ? `http://localhost:3000/api/products/${editingProduct._id}`
      : "http://localhost:3000/api/products";
    const method = editingProduct ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanFormData),
      });
      setShowModal(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "DELETE",
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      product_name: "",
      price: "",
      category_id: "",
      image: "",
      description: "",
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <h3>Products</h3>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Add Product
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.product_name}</td>
                <td>${p.price}</td>
                <td>{p.category_id}</td>
                <td>
                  <img src={p.image} width={50} />
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(p)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="text"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>

              <Form.Control
                type="description"
                name="description"
                value={formData.description}
                onChange={(value) =>
                  setFormData((f) => ({ ...f, description: value }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            {editingProduct ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductList;
