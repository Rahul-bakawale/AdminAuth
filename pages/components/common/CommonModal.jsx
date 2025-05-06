"use client";
import { Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import InputField from "./InputField";
import Buttons from "./Button";

const CommonModal = ({
  showModal,
  handleClose,
  handleSave,
  formData,
  handleChange,
  title,
  fields,
  isEditing,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {fields?.map((field, idx) => (
            <Form.Group key={idx} className="mb-3">
              <Form.Label>{field?.label}</Form.Label>
              {field?.type === "textarea" ? (
                <InputField
                  as="textarea"
                  rows={3}
                  name={field?.name}
                  value={formData[field?.name]}
                  onChange={handleChange}
                  required={field?.required}
                />
              ) : (
                <InputField
                  type={field?.type}
                  name={field?.name}
                  value={formData[field?.name]}
                  onChange={handleChange}
                  required={field?.required}
                />
              )}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Buttons variant="secondary" onClick={handleClose}>
          Cancel
        </Buttons>
        <Buttons variant="success" onClick={handleSave}>
          {isEditing ? "Update" : "Create"}
        </Buttons>
      </Modal.Footer>
    </Modal>
  );
};

CommonModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default CommonModal;
