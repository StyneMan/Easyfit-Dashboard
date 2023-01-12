import React from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useSnackbar } from "notistack";
// import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../../dashboard/dialogs/custom-dialog";
import CustomDialog2 from "../../dashboard/dialogs/custom-dialog";
import CustomDialog3 from "../../dashboard/dialogs/custom-dialog";

import { db, doc, updateDoc } from "../../../../data/firebase";
import {
  Cancel,
  CheckCircleRounded,
  DirectionsBikeRounded,
} from "@mui/icons-material";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  awardRoot: {
    display: "flex",
    flexDirection: "column",
  },
  awardRow: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ActionButtons = ({ selected }) => {
  const classes = useStyles();

  const [openInDelivery, setOpenInDelivery] = React.useState(false);
  const [openDelivered, setOpenDelivered] = React.useState(false);
  const [openCancelled, setOpenCancelled] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  // const { userData } = useSelector((state) => state.user);

  const performUpdate = async (status) => {
    try {
      const mRef = doc(db, "deliveries", "" + selected?.row?.id);
      await updateDoc(mRef, {
        status: `${status}`,
        order: {
          status: `${status}`,
        },
      });

      //Update the order table here
      const orderRef = doc(db, "orders", "" + selected?.row?.order?.id);
      await updateDoc(orderRef, {
        status: `${status}`,
      });

      enqueueSnackbar(`${"Order status updated successfully!"}`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  const renderDeliveredConfirm = (
    <div className={classes.awardRoot}>
      <Typography>{`Are you sure you want to mark`}</Typography>
      <Typography gutterBottom>{`delivery as 'Delivered'?`}</Typography>
      <div className={classes.awardRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="error"
          onClick={() => setOpenDelivered(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="success"
          onClick={() => performUpdate("Completed")}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  const renderInDeliveryConfirm = (
    <div className={classes.awardRoot}>
      <Typography>{`Are you sure you want to mark`}</Typography>
      <Typography gutterBottom>{`delivery as 'In Delivery' ?`}</Typography>
      <div className={classes.awardRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="error"
          onClick={() => setOpenInDelivery(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="success"
          onClick={() => performUpdate("In Delivery")}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  const renderCancelledConfirm = (
    <div className={classes.awardRoot}>
      <Typography>{`Are you sure you want to cancel delivery?`}</Typography>
      <Typography gutterBottom>{`Action can't be undone!`}</Typography>
      <div className={classes.awardRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="error"
          onClick={() => setOpenCancelled(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="success"
          onClick={() => performUpdate("Cancelled")}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <CustomDialog
        title="Set Status to 'In Delivery'"
        bodyComponent={renderInDeliveryConfirm}
        open={openInDelivery}
        handleClose={() => setOpenInDelivery(false)}
      />
      <CustomDialog2
        title="Cancel Delivery"
        bodyComponent={renderCancelledConfirm}
        open={openCancelled}
        handleClose={() => setOpenCancelled(false)}
      />
      <CustomDialog3
        title="Set Status to 'Delivered'"
        bodyComponent={renderDeliveredConfirm}
        open={openDelivered}
        handleClose={() => setOpenDelivered(false)}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          disabled={
            selected?.row.status === "Completed" ||
            selected?.row.status === "Cancelled"
              ? true
              : false
          }
          size="small"
          onClick={() => setOpenCancelled(true)}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Cancel
              sx={{
                color:
                  selected?.row.status === "Completed" ||
                  selected?.row.status === "Cancelled"
                    ? "lightgrey"
                    : "#f44336",
              }}
            />
            <Typography fontSize={12}>Cancel</Typography>
          </Box>
        </Button>

        <Button
          disabled={
            selected?.row.status === "Completed" ||
            selected?.row.status === "Cancelled" ||
            selected?.row.status === "In Delivery"
              ? true
              : false
          }
          size="small"
          onClick={() => setOpenInDelivery(true)}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <DirectionsBikeRounded />
            <Typography fontSize={12}>In Delivery</Typography>
          </Box>
        </Button>

        <Button
          disabled={
            selected?.row.status === "Completed" ||
            selected?.row.status === "Cancelled"
              ? true
              : false
          }
          size="small"
          onClick={() => setOpenDelivered(true)}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <CheckCircleRounded
              sx={{
                color:
                  selected?.row.status === "In Delivery" ||
                  selected?.row.status === "Cancelled"
                    ? "lightgrey"
                    : "#66bb6a",
              }}
            />
            <Typography fontSize={12}>Delivered</Typography>
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default ActionButtons;
