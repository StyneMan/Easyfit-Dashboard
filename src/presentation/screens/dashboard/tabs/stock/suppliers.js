import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import SuppliersTable from "../../../../components/table/suppliers";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: "auto",
    minHeight: 275,
    minWidth: 320,
    alignItems: "center",
  },
  cardMedia: {
    height: 156,
    width: "100%",
  },
  subRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
  },
  lhsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  avatar: {
    height: 36,
    width: 36,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    padding: 4,
  },
}));

const Suppliers = () => {
  const classes = useStyles();
  const history = useHistory();
  //   const [open, setOpen] = React.useState(false);
  const { userData } = useSelector((state) => state.user);

  return (
    <div>
      <div className={classes.row}>
        <div className={classes.lhsRow}>
          <Typography
            textTransform={"uppercase"}
            variant="h4"
            fontWeight="700"
            color="primary.main"
          >
            SUPPLIERS
          </Typography>
        </div>
        <Button
          disabled={userData?.userType !== "Admin"}
          startIcon={<Add />}
          color="primary"
          variant="contained"
          onClick={() =>
            history.push("/dashboard/easyfit/stocks/suppliers/create")
          }
        >
          Add Supplier
        </Button>
      </div>
      <br />
      <SuppliersTable />
    </div>
  );
};

export default Suppliers;
