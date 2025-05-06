import React, { useEffect, useState } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import CommonModal from "../common/CommonModal";
import Buttons from "../common/Button";
import { useRouter } from "next/router";

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
  const router = useRouter();

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
  const fields = [
    {
      label: "Product Name",
      name: "product_name",
      type: "text",
      required: true,
    },
    { label: "Price", name: "price", type: "number", required: true },
    { label: "Category ID", name: "category_id", type: "text" },
    { label: "Image URL", name: "image", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
  ];
  return (
    <Container className="mt-4">
      <div className="d-flex flex-wrap gap-3 mb-4">
        <Buttons
          variant="success"
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center gap-2"
        >
          + Add Product
        </Buttons>
        <Buttons
          variant="primary"
          onClick={() => router.push("/users/user-list")}
          className="d-flex align-items-center gap-2"
        >
          View User List
        </Buttons>
      </div>
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
                  <Buttons
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(p)}
                    className="me-2"
                  >
                    Edit
                  </Buttons>
                  <Buttons
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Buttons>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <CommonModal
        showModal={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        formData={formData}
        handleChange={handleChange}
        title={editingProduct ? "Edit Product" : "Add Product"}
        fields={fields}
        isEditing={!!editingProduct}
      />
    </Container>
  );
};

export default ProductList;
