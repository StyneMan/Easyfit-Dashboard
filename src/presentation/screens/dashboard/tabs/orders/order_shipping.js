import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import CustomDialog from "../../../../components/dashboard/dialogs/custom-dialog";
import DeliveryForm from "../../../../forms/delivery/delivery_form";

const OrderShipping = () => {
  const location = useLocation();
  const history = useHistory();
  let { item } = location.state;
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <CustomDialog
        title="Assign Delivery"
        bodyComponent={<DeliveryForm setOpen={setOpen} order={item} />}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <Box
        width={"100%"}
        display="flex"
        flexDirection="row"
        justifyContent="start"
        alignItems={"start"}
        paddingBottom={2}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIosNew />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        <Typography
          px={4}
          textTransform={"uppercase"}
          variant="h6"
          fontWeight="700"
          color="primary.main"
        >
          ORDER SHIPPING
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
        >
          <Typography
            gutterBottom
          >{`Order Number: ${item?.orderNo}`}</Typography>
          <Typography gutterBottom>{`Order Date: ${new Date(
            item?.createdAt?.seconds * 1000
          ).toLocaleString("en-US")}`}</Typography>
          <Typography
            gutterBottom
          >{`Ordered by ${item?.customerName}`}</Typography>
          <Typography
            gutterBottom
          >{`Customer ID ${item?.customerId}`}</Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
        >
          <Typography
            gutterBottom
          >{`Payment Method: ${item?.paymentMethod}`}</Typography>
          <Typography gutterBottom>{`Paid On: ${new Date(
            item?.paidAt
          ).toDateString()}`}</Typography>
          <Typography
            gutterBottom
          >{`Delivery Type: ${item?.deliveryType}`}</Typography>
          <Typography
            gutterBottom
          >{`Order Status: ${item?.status}`}</Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        {item?.deliveryType !== "Pickup" && (
          <>
            <br />
            <Typography variant="h6" fontWeight="600">
              Delivery Details
            </Typography>
            <Typography>{`Total Items: ${item?.items?.length}`}</Typography>
            <Typography>
              {`Delivering To: ${item?.deliveryInfo?.customerName}`}
            </Typography>
            <Typography>
              {`Delivery Address: ${item?.deliveryInfo?.address}`}
            </Typography>
            <Typography>
              {`Delivery Contact: ${item?.deliveryInfo?.phone}`}
            </Typography>
            <Typography>
              {`Delivery Description: ${item?.deliveryInfo?.description}`}
            </Typography>
          </>
        )}
      </Box>
      <br />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        <Typography variant="h6" fontWeight="600" pr={4} gutterBottom>
          Delivery Scheduling
        </Typography>
        <Button
          textTransform="capitalize"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Schedule Now
        </Button>
      </Box>
    </div>
  );
};

export default OrderShipping;
