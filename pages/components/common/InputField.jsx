"use client";
import Form from "react-bootstrap/Form";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={className}
      />
    </Form.Group>
  );
};

export default InputField;
