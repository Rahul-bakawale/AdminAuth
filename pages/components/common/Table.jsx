import { Table } from "react-bootstrap";
import Buttons from "./Button";

const CommonTable = ({ data, columns, actions }) => {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((rowData) => (
          <tr key={rowData._id}>
            {columns.map((col, index) => (
              <td key={index}>{rowData[col.field]}</td>
            ))}
            <td>
              {actions.map((action, index) => (
                <Buttons
                  key={index}
                  size="sm"
                  variant={action.variant}
                  onClick={() => action.onClick(rowData)}
                  className="me-2"
                >
                  {action.label}
                </Buttons>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CommonTable;
