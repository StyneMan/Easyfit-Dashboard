import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "image",
    label: "Image",
    minWidth: 85,
    render: (value) => <img src={value} alt="" width={75} />,
  },
  { id: "name", label: "Name", minWidth: 85 },
  { id: "category", label: "Category", minWidth: 85 },
  {
    id: "price",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 45,
  },
  {
    id: "cost",
    label: "Subtotal",
    minWidth: 50,
    format: (value) => value.toFixed(2),
  },
];

export default function OrderItemsTable(props) {
  let { items } = props;
  //   const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setR owsPerPage] = React.useState(10);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items?.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row?.productId}
                  >
                    {columns.map((column, key) => {
                      const value = row[column.id];
                      return (
                        <>
                          {key === 0 ? (
                            <TableCell key={column.id} align={column.align}>
                              <img src={value} alt="" width={50} />
                            </TableCell>
                          ) : (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )}
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
