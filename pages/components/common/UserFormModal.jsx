"use client";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputField from "./InputField";

const UserFormModal = ({
  show,
  onClose,
  onSubmit,
  form,
  setForm,
  isEditing,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit User" : "Add New User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <InputField
            type="text"
            className="form-control mb-2"
            placeholder="Full Name"
            value={form?.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <InputField
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={form?.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <InputField
            type="text"
            className="form-control mb-2"
            placeholder="Phone"
            value={form?.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <InputField
            type="text"
            className="form-control"
            placeholder="Profile Pic URL"
            value={form?.profilePicture}
            onChange={(e) =>
              setForm({ ...form, profilePicture: e.target.value })
            }
          />

          <Button variant="primary" type="submit" className="w-100 mt-3">
            {isEditing ? "Update User" : "Add User"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default UserFormModal;
