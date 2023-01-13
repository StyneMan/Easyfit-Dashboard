import React, { forwardRef } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import EmptyModal from "../modal/EmptyModal";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Fade from "@mui/material/Fade";
// import DataPreview from "../miscellaneous/DataPreview";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../../dashboard/dialogs/custom-dialog";
import DoneAll from "@mui/icons-material/DoneAll";
import { db, doc, updateDoc } from "../../../../data/firebase";
import { BikeScooter, Cancel } from "@mui/icons-material";
// import OrdersPreview from "./preview";
import Box from "@mui/system/Box";
import { Divider, ListItem } from "@mui/material";
import logo from "../../../../assets/images/dwec_round.png";
import { useHistory } from "react-router-dom";
import ReactToPrint from "react-to-print";
import CurrencyFormat from "react-currency-format";

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

const ComponentToPrint = forwardRef((props, ref) => {
  let { deliveryType, deliveryInfo, items } = props;

  const [subtotal, setSubTotal] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [tax, setTax] = React.useState("7.5%");

  React.useEffect(() => {
    if (items) {
      let sum = 0;
      let tax = 0.075;
      setTax("7.5%");
      items?.forEach((element) => {
        sum = sum + element?.cost;
      });
      setSubTotal(sum);
      let vat = tax * sum;
      setTotal(vat + sum);
    }
  }, [items]);

  const renderList = (
    <Box>
      {items?.map((elem, key) => (
        <ListItem dense disablePadding key={key} divider>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
          >
            <Box flex={1}>
              <Typography>{elem?.productId}</Typography>
            </Box>
            <Box flex={1}>
              <img src={elem?.image} alt="" width={56} />
            </Box>
            <Box flex={1}>
              <Typography>{elem?.name}</Typography>
            </Box>
            <Box flex={1}>
              <Typography>{elem?.category}</Typography>
            </Box>
            <Box flex={1}>
              <CurrencyFormat
                value={elem?.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
            <Box flex={1}>
              <Typography>x{elem?.quantity}</Typography>
            </Box>
            <Box flex={1}>
              <CurrencyFormat
                value={elem?.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
          </Box>
        </ListItem>
      ))}
    </Box>
  );

  const renderSignature = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="start"
    >
      {deliveryInfo && (
        <Typography gutterBottom textAlign="justify">
          I ........................................... certify that the above
          item(s) was delivered to my address {`${deliveryInfo.address}`} this
          day, {`${new Date()}`}. Item(s) was well received by me.
        </Typography>
      )}

      {!deliveryInfo && (
        <Typography gutterBottom textAlign="justify">
          I ........................................... certify that the above
          item(s) was collected by me this day, {`${new Date()}`}. Item(s) was
          well received by me.
        </Typography>
      )}
      <br />
      <br />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>.............................................</Typography>
        <Typography fontStyle={"italic"} fontSize={13}>
          Signature & Date
        </Typography>
      </Box>
    </Box>
  );

  return (
    <div className="print-source" ref={ref}>
      <Box
        padding={2}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="start"
        alignItems="center"
      >
        <img src={logo} alt="" width={72} />
        <Typography variant="h4" fontWeight={"700"}>
          easyfit Winery
        </Typography>
      </Box>
      <Box
        bgcolor={"primary.light"}
        padding={3}
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        <Typography
          variant="h6"
          gutterBottom
        >{`Dear easyfit Winery customer,`}</Typography>
        <Typography variant="h6" gutterBottom>
          Thank you for shopping with us.
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="start"
          alignItems="center"
        >
          <Typography
            color="primary.main"
            variant="h5"
            fontWeight="600"
            textTransform={"uppercase"}
            pr={1}
          >
            Delivery Method:
          </Typography>
          <Typography variant="h6">{deliveryType}</Typography>
        </Box>
        {deliveryType !== "Pickup" && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Typography
              color="primary.main"
              variant="h5"
              fontWeight="600"
              gutterBottom={true}
              textTransform={"uppercase"}
            >
              Delivery Information:
            </Typography>
            <Typography variant="h6" fontWeight="600">
              Delivery Address
            </Typography>
            <Typography gutterBottom>{deliveryInfo.address}</Typography>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="600">
                Customer Name
              </Typography>
              <Typography gutterBottom>{deliveryInfo.customerName}</Typography>

              <Typography variant="h6" fontWeight="600">
                Phone Number
              </Typography>
              <Typography gutterBottom>{deliveryInfo.phone}</Typography>
            </Box>

            <Typography variant="h6" fontWeight="600">
              Description
            </Typography>
            <Typography gutterBottom>{deliveryInfo.description}</Typography>
          </Box>
        )}
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="stretch"
          alignItems="stretch"
        >
          <Typography variant="h6" gutterBottom>
            You ordered for:
          </Typography>
          {renderList}
          <Divider />
          <br />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="end"
            alignItems="end"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom px={2}>
                Sub Total:{" "}
              </Typography>
              <CurrencyFormat
                value={subtotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom px={2}>
                VAT (%){" "}
              </Typography>
              <Typography gutterBottom>{tax}</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom px={2}>
                Total:
              </Typography>
              <CurrencyFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
          </Box>
        </Box>
        <Divider />
        <br />
        {renderSignature}
      </Box>
    </div>
  );
});

const ActionButton = ({ selected }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCompleted, setOpenCompleted] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);

  const componentRef = React.useRef();

  const openAction = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useSelector((state) => state.user);
  const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  const handleCloseMoreAction = () => {
    setAnchorEl(null);
    setOpenCompleted(false);
  };

  const handleCompleted = () => {
    setOpenCompleted(true);
  };

  const handleCancelled = () => {
    setOpenCancel(true);
  };

  const performCompleted = async () => {
    try {
      const mRef = doc(db, "orders", "" + selected?.row?.id);
      await updateDoc(mRef, {
        status: "Completed",
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

  const cancelOrder = async () => {
    try {
      const mRef = doc(db, "orders", "" + selected?.row?.id);
      await updateDoc(mRef, {
        status: "Cancelled",
      });
      enqueueSnackbar(`${"Order cancelled successfully!"}`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  const renderCompletedConfirm = (
    <div className={classes.awardRoot}>
      <Typography>
        {`Are you sure you want to mark order as 'completed' ?`}
      </Typography>
      <div className={classes.awardRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="error"
          onClick={() => setOpenCompleted(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="success"
          onClick={performCompleted}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  const renderCancelConfirm = (
    <div className={classes.awardRoot}>
      <Typography>
        {`Are you sure you want to cancel this order ${selected?.row?.orderNo}? Action cannot be undone`}
      </Typography>
      <div className={classes.awardRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="error"
          onClick={() => setOpenCancel(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="success"
          onClick={cancelOrder}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <IconButton
        aria-label="actions"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleMoreAction}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openAction}
        onClose={handleCloseMoreAction}
        TransitionComponent={Fade}
        elevation={1}
      >
        <MenuItem
          onClick={() =>
            history.push({
              pathname: "/dashboard/easyfit/orders/" + selected?.row?.orderNo,
              state: {
                item: selected?.row,
              },
            })
          }
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Preview" />
        </MenuItem>

        <MenuItem>
          <ReactToPrint
            trigger={() => (
              <Button
                variant="text"
                sx={{ textTransform: "capitalize", mx: 1 }}
              >
                Print Receipt
              </Button>
            )}
            content={() => componentRef.current}
          />
          <ComponentToPrint
            deliveryType={selected?.row?.deliveryType}
            summaryBody={
              <Box
                pt={6}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingY={1}
                >
                  <Typography px={2} variant="h5">
                    Sub total
                  </Typography>
                  <CurrencyFormat
                    value={100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </Box>

                <Box
                  paddingY={1}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography px={2} variant="h5">
                    Tax
                  </Typography>
                  <CurrencyFormat
                    value={7.5}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </Box>

                <Box
                  paddingY={1}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography px={2} variant="h5">
                    Total
                  </Typography>
                  <CurrencyFormat
                    value={7.5 + 100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </Box>
              </Box>
            }
            items={selected?.row?.items}
            deliveryInfo={selected?.row?.deliveryInfo}
            ref={componentRef}
          />
          {/* <ListItemIcon>
            <PrintRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Print Receipt" /> */}
        </MenuItem>
        {((userData && userData?.userType === "Admin") ||
          (userData && userData?.userType === "Manager")) &&
        selected?.row ? (
          <>
            {(selected?.row?.status === "Pending" ||
              selected?.row?.status === "In Shipping") && (
              <div>
                {selected.row?.status !== "Cancelled" &&
                  (selected?.row?.deliveryType === "Pickup" ? (
                    <>
                      <MenuItem onClick={handleCompleted}>
                        <ListItemIcon>
                          <DoneAll fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Mark As Completed" />
                      </MenuItem>
                      <CustomDialog
                        title="Mark As Completed"
                        bodyComponent={renderCompletedConfirm}
                        open={openCompleted}
                        handleClose={() => setOpenCompleted(false)}
                      />
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() =>
                          history.push({
                            pathname:
                              "/dashboard/easyfit/orders/" +
                              selected?.row?.orderNo +
                              "/shipping",
                            state: {
                              item: selected?.row,
                            },
                          })
                        }
                      >
                        <ListItemIcon>
                          <BikeScooter fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Send For Shipping" />
                      </MenuItem>
                    </>
                  ))}

                {selected?.row?.status !== "Completed" && (
                  <>
                    <MenuItem onClick={handleCancelled}>
                      <ListItemIcon>
                        <Cancel fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText primary="Cancel" />
                    </MenuItem>
                    <CustomDialog
                      title="Cancel Order"
                      bodyComponent={renderCancelConfirm}
                      open={openCancel}
                      handleClose={() => setOpenCancel(false)}
                    />
                  </>
                )}
              </div>
            )}
          </>
        ) : null}
      </Menu>
    </>
  );
};

export default ActionButton;
