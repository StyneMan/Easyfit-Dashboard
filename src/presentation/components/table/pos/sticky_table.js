import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { IconButton, TextField } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

const columns = [
  { id: "name", label: "Name", minWidth: 85 },
  {
    id: "price",
    label: "Price",
    minWidth: 40,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 45,
    format: (value) => (
      <TextField
        sx={{ border: "none" }}
        variant="standard"
        size="small"
        value={1}
        type="number"
      />
    ),
  },
  {
    id: "subtotal",
    label: "Subtotal",
    minWidth: 50,
    format: (value) => value.toFixed(2),
  },
  {
    id: "id",
    label: "",
    minWidth: 50,
    renderCell: (value) => (
      <IconButton>
        <DeleteOutlined />
      </IconButton>
    ),
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { userData } = useSelector((state) => state.user);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
            {userData &&
              userData?.sales
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row?.productId}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
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
