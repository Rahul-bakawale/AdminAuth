import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Buttons = ({
  size = "sm",
  variant = "warning",
  onClick,
  children,
  className = "",
  ...props
}) => {
  return (
    <Button
      size={size}
      variant={variant}
      onClick={onClick}
      className={`me-2 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

Buttons.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Buttons;
