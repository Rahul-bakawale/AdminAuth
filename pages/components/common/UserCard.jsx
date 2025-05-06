import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import Buttons from "./Button";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div
      className="card shadow-sm border rounded p-3 position-relative m-2 user-card"
      style={{ width: "18rem", transition: "transform 0.2s ease" }}
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
        <Buttons
          className="btn btn-sm btn-primary me-2"
          onClick={() => onEdit(user)}
        >
          <FaEdit />
        </Buttons>
        <Buttons
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(user._id)}
        >
          <FaTrash />
        </Buttons>
      </div>
    </div>
  );
};
export default UserCard;
