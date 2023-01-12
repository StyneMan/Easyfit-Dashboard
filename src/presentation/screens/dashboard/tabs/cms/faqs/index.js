import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import CustomDialog from "../../../../../components/dashboard/dialogs/custom-dialog";
import AddFAQ from "../../../../../forms/faqs/add_faq";
import FAQsTable from "../../../../../components/table/faqs";

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

const FAQs = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <CustomDialog
        title="Add New Frequently Asked Question"
        open={open}
        handleClose={() => setOpen(false)}
        bodyComponent={<AddFAQ setOpen={setOpen} />}
      />
      <div className={classes.row}>
        <div className={classes.lhsRow}>
          <Typography
            textTransform={"uppercase"}
            variant="h4"
            fontWeight="700"
            color="primary.main"
          >
            FREQUENTLY ASKED QUESTIONS
          </Typography>
        </div>
        <Button
          startIcon={<Add />}
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          New FAQ
        </Button>
      </div>
      <br />
      <FAQsTable />
    </div>
  );
};

export default FAQs;
