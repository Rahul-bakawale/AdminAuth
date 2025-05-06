import { useCallback, useEffect, useMemo, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "../common/UserCard";
import UserFormModal from "../common/UserFormModal";
import Buttons from "../common/Button";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await fetch(`/api/users/${id}`, { method: "DELETE" });
        toast.success("User deleted");
        fetchUsers();
      } catch {
        toast.error("Failed to delete user");
      }
    },
    [fetchUsers]
  );

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setForm(user);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingUser ? `/api/users/${editingUser}` : "/api/users";
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(editingUser ? "User updated" : "User created");
        fetchUsers();
        setForm({ fullName: "", email: "", phone: "", profilePicture: "" });
        setEditingUser(null);
        setShowModal(false);
      } else {
        toast.error("Failed to save user");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const userCards = useMemo(
    () =>
      users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )),
    [users, handleDelete]
  );

  return (
    <div className="container mt-4">
      <div className="button-group">
        <Buttons
          variant="primary"
          onClick={() => router.push("/products/product-list")}
          className="custom-back-btn float-end"
        >
          ← Back
        </Buttons>

        <Buttons
          variant="success"
          onClick={() => setShowModal(true)}
          className="floating-ring-button"
        >
          + Create User
        </Buttons>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="d-flex flex-wrap mt-4">{userCards}</div>
      )}

      <UserFormModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
          setForm({ fullName: "", email: "", phone: "", profilePicture: "" });
        }}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        isEditing={!!editingUser}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
