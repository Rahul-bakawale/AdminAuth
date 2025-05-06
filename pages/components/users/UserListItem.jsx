import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePicture: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = useCallback(
    async (id) => {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    },
    [fetchUsers]
  );

  const handleEdit = useCallback((user) => {
    setEditingUser(user._id);
    setForm(user);
    setShowModal(true);
  }, []);
  const createUser = async (data) => {
    return await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const updateUser = async (id, data) => {
    return await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      let res;
      if (editingUser) {
        res = await updateUser(editingUser, form);
      } else {
        res = await createUser(form);
      }

      if (res.ok) {
        fetchUsers();
        setForm({ fullName: "", email: "", phone: "", profilePic: "" });
        setEditingUser(null);
        setShowModal(false);
      }
    },
    [editingUser, form, fetchUsers]
  );

  const userCards = useMemo(
    () =>
      users.map((user) => (
        <div
          key={user._id}
          className="card shadow-sm border rounded p-3 position-relative m-2 user-card"
          style={{
            width: "18rem",
            transition: "transform 0.2s ease",
            overflow: "hidden",
          }}
        >
          <Image
            src={user.profilePic}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-circle mx-auto d-block"
            loading="lazy"
          />
          <div className="text-center mt-3">
            <h5>{user.fullName}</h5>
            <p className="mb-1">{user.email}</p>
            <small>{user.phone}</small>
          </div>
          <div className="action-buttons">
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => handleEdit(user)}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(user._id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )),
    [users, handleDelete, handleEdit]
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Management</h2>
      <Button variant="success" onClick={() => setShowModal(true)}>
        + Create User
      </Button>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="d-flex flex-wrap mt-4">{userCards}</div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? "Edit User" : "Add New User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Profile Pic URL"
              value={form.profilePicture}
              onChange={(e) =>
                setForm({ ...form, profilePicture: e.target.value })
              }
            />

            <Button variant="primary" type="submit" className="w-100">
              {editingUser ? "Update User" : "Add User"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
