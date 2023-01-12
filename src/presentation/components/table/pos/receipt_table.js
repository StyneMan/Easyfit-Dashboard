import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
// import user from "../../../../data/store/slice/user";
import CurrencyFormat from "react-currency-format";
import Box from "@mui/system/Box";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ReceiptTable() {
  const { userData } = useSelector((state) => state.user);

  return (
    <TableContainer component={Box}>
      <Table sx={{ width: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S/No</StyledTableCell>
            <StyledTableCell align="center">IMAGE</StyledTableCell>
            <StyledTableCell align="center">ITEM</StyledTableCell>
            <StyledTableCell align="center">PRICE</StyledTableCell>
            <StyledTableCell align="center">QUANTITY</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData &&
            userData?.sales?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <img src={row.image} alt="" width={48} />
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <CurrencyFormat
                    value={row.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {/* <Box>Hello Summary here</Box> */}
    </TableContainer>
  );
}
