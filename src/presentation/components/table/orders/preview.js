import Print from "@mui/icons-material/Print";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { forwardRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import OrderItemsTable from "./items_table";
import { Divider, ListItem } from "@mui/material";
import CurrencyFormat from "react-currency-format";
import logo from "../../../../assets/images/dwec_round.png";
import ReactToPrint from "react-to-print";

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

const OrdersPreview = () => {
  const location = useLocation();
  const history = useHistory();
  let { item } = location.state;
  const componentRef = React.useRef();

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIosNew />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>

        <ReactToPrint
          trigger={() => (
            <Button
              variant="contained"
              startIcon={<Print />}
              sx={{ textTransform: "capitalize", mx: 1 }}
            >
              Print Receipt
            </Button>
          )}
          content={() => componentRef.current}
        />
        <ComponentToPrint
          deliveryType={item?.deliveryType}
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
          items={item?.items}
          deliveryInfo={item?.deliveryInfo}
          ref={componentRef}
        />
      </Box>
      <Box p={3}>
        <Typography variant="h5" fontWeight="600" color="primary.main">
          Order Summary
        </Typography>
        <Typography>{`Below is the order summary for ${item?.customerName}'s order with the order number, ${item?.orderNo}`}</Typography>
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
        <Typography variant="h6" fontWeight="600">
          Items Ordered
        </Typography>
        <OrderItemsTable items={item?.items} />
      </Box>
    </div>
  );
};

export default OrdersPreview;
