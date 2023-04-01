import {
  Button,
  Card,
  CardActionArea,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/system/Box";
import React, { forwardRef, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import logo from "../../../assets/images/ic_launcher.png";
import CurrencyFormat from "react-currency-format";
import POSTable from "../../components/table/pos";
import {
  db,
  doc,
  arrayUnion,
  updateDoc,
  setDoc,
  arrayRemove,
  increment,
} from "../../../data/firebase";
import { setInitValue, setTriggerPOS } from "../../../data/store/slice/sales";
import DeliveryDining from "@mui/icons-material/DeliveryDining";
import CustomDialog from "../../components/dashboard/dialogs/custom-dialog";
import CustomDialog2 from "../../components/dashboard/dialogs/custom-dialog";
import ShippingForm from "../../forms/shipping/shipping_form";
import { setSalesDeliveryData } from "../../../data/store/slice/deliveries";
import ReactToPrint from "react-to-print";
import "./print.css";
import ReceiptTable from "../../components/table/pos/receipt_table";

const ItemCard = (props) => {
  let { item, userData, list } = props;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const addProduct = () => {
    dispatch(setInitValue(0));
    dispatch(setTriggerPOS("product"));

    setTimeout(() => {
      dispatch(setTriggerPOS(null));
    }, 3000);
    const timeNow = new Date();
    const usersRef = doc(db, "users", `${userData?.id}`);
    list?.forEach(async (elem) => {
      if (elem?.id !== item?.id) {
        try {
          await updateDoc(usersRef, {
            sales: arrayUnion({
              id: timeNow.getTime(),
              productId: item?.id,
              category: item?.category,
              name: item?.name,
              quantity: 1,
              image: item?.image,
              price: item?.price,
              cost: item?.price * (item?.quantity || 1),
            }),
          });
        } catch (error) {
          enqueueSnackbar(
            `${error?.message || "Check your internet connection!"}`,
            {
              variant: "error",
            }
          );
        }
      }
    });
  };

  return (
    <div>
      <Card
        elevation={0}
        sx={{ borderRadius: 2, backgroundColor: "#9A031E1A", height: 144 }}
      >
        <CardActionArea
          onClick={addProduct}
          sx={{ borderRadius: 2, backgroundColor: "#9A031E1A", height: 144 }}
        >
          <img src={item?.image} alt="" width={100} />
        </CardActionArea>
      </Card>
      <Typography paddingY={1}>{item?.name}</Typography>
    </div>
  );
};

const ComponentToPrint = forwardRef((props, ref) => {
  let { deliveryType, deliveryInfo, summaryBody } = props;

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
          item(s) was delivered to my adress {`${deliveryInfo.address}`} this
          day, {`${new Date()}`}. Item(s) was well received by me.
        </Typography>
      )}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>...........................................</Typography>
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

            <Typography variant="h6" fontWeight="600">
              Delivery City
            </Typography>
            <Typography gutterBottom>{deliveryInfo.city}</Typography>

            <Typography variant="h6" fontWeight="600">
              Email Address
            </Typography>
            <Typography gutterBottom>{deliveryInfo.email}</Typography>

            <Typography variant="h6" fontWeight="600">
              Phone Number
            </Typography>
            <Typography gutterBottom>{deliveryInfo.phone}</Typography>
          </Box>
        )}
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
        >
          <Typography variant="h6" gutterBottom>
            You ordered for:
          </Typography>
          <ReceiptTable />
          <Divider />
          {summaryBody}
        </Box>
        <Divider />
        <Toolbar />
        {renderSignature}
      </Box>
    </div>
  );
});

const Receipt = (props) => {
  const dispatch = useDispatch();
  const [openProceed, setOpenProceed] = React.useState(false);
  const [openShipping, setOpenShipping] = React.useState(false);
  let { totalItems, userData, triggerPOS, initValue, tax } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { salesDeliveryData } = useSelector((state) => state.delivery);

  // const ref = useRef();
  const componentRef = useRef();

  React.useEffect(() => {
    userData?.sales?.forEach((elem) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch(setInitValue((initValue += elem?.cost)));
    });
  }, []);

  React.useEffect(() => {
    if (triggerPOS) {
      userData?.sales?.forEach((elem) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(setInitValue((initValue += elem?.cost)));
      });
    }
  }, [triggerPOS]);

  const confirmCash = async () => {
    const timeNow = new Date();
    const usersRef = doc(db, "users", `${userData?.id}`);
    // const productRef = doc(db, "products", `${userData?.id}`);
    try {
      userData?.sales?.forEach((elem) => {
        setDoc(doc(db, "sales", `${timeNow.getTime()}`), {
          id: timeNow.getTime(),
          avatar: userData?.image,
          image: elem?.image,
          product: elem?.productId,
          name: elem?.name,
          price: elem?.price,
          quantity: elem?.quantity,
          cost: elem?.cost,
          deliveryType: salesDeliveryData !== null ? "Door Delivery" : "Pickup",
          deliveryInfo: salesDeliveryData,
          status: "Paid",
          rep: userData?.firstname + " " + userData?.lastname,
          soldOn: timeNow,
        });

        //Now update product quantity
        updateDoc(doc(db, "products", `${elem?.productId}`), {
          quantity: increment(-elem?.quantity),
        });
      });

      //Now delete all cart/sales array
      await userData?.sales?.forEach(async (elem) => {
        //Add to trasactions
        await setDoc(doc(db, "pos_transactions", `${timeNow.getTime()}`), {
          id: timeNow.getTime(),
          avatar: userData?.image,
          image: elem?.image,
          product: elem?.productId,
          name: elem?.name,
          price: elem?.price,
          quantity: elem?.quantity,
          cost: elem?.cost,
          deliveryType: salesDeliveryData !== null ? "Door Delivery" : "Pickup",
          deliveryInfo: salesDeliveryData,
          status: "Paid",
          rep: userData?.firstname + " " + userData?.lastname,
          repId: userData?.id,
          soldOn: timeNow,
        });

        await updateDoc(usersRef, {
          sales: arrayRemove(elem),
        });
      });

      dispatch(setSalesDeliveryData(null));
      dispatch(setTriggerPOS("Empty"));
      dispatch(setInitValue(0));
      //Snackbar here
      enqueueSnackbar(`${"Purchase made successfully."}`, {
        variant: "success",
      });
      //Close dialog here
      setOpenProceed(false);
    } catch (error) {
      enqueueSnackbar(
        `${error?.message || "Check your internet connection!"}`,
        {
          variant: "error",
        }
      );
    }
  };

  const renderShipping = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <div
        style={{
          width: 465,
          overflow: "auto",
        }}
      >
        <ShippingForm setOpen={setOpenShipping} />
      </div>
    </Box>
  );

  const renderProceed = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      width={800}
    >
      <Grid container spacing={2}>
        <Grid item sm={6} md={8}>
          <div
            style={{
              height: 400,
              overflow: "auto",
            }}
          >
            <POSTable />
          </div>
        </Grid>
        <Grid item sm={6} md={4}>
          <Box
            pt={6}
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="stretch"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingY={1}
            >
              <Typography>Total Items</Typography>
              <Typography>{totalItems}</Typography>
            </Box>
            <Divider />
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingY={1}
            >
              <Typography>Sub total</Typography>
              <CurrencyFormat
                value={initValue}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
            <Divider />
            <Box
              paddingY={1}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Tax</Typography>
              <CurrencyFormat
                value={tax}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
            <Divider />
            <Box
              paddingY={1}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Total</Typography>
              <CurrencyFormat
                value={tax + initValue}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
            <Toolbar />
          </Box>
        </Grid>
      </Grid>
      <Box
        pt={2}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="end"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ textTransform: "capitalize" }}
          onClick={() => setOpenProceed(false)}
        >
          Close
        </Button>
        <div>
          <ReactToPrint
            trigger={() => (
              <Button
                variant="contained"
                sx={{ textTransform: "capitalize", mx: 1 }}
              >
                Print
              </Button>
            )}
            content={() => componentRef.current}
          />
          <ComponentToPrint
            deliveryType={
              salesDeliveryData === null ? "Pickup" : "Door Delivery"
            }
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
                    value={initValue}
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
                    value={tax}
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
                    value={tax + initValue}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </Box>
              </Box>
            }
            deliveryInfo={salesDeliveryData}
            ref={componentRef}
          />
        </div>
        <Button
          color="success"
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={confirmCash}
        >
          Confirm with Cash
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <CustomDialog
        open={openShipping}
        handleClose={() => setOpenShipping(false)}
        title="Shipping Information"
        bodyComponent={renderShipping}
      />
      <CustomDialog2
        open={openProceed}
        handleClose={() => setOpenProceed(false)}
        title="Proceed to Payment"
        bodyComponent={renderProceed}
      />
      <Box
        pb={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <img src={logo} alt="" width="40%" />
        <Box
          pt={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography
            fontSize={16}
            color="primary.main"
            gutterBottom
            fontWeight="600"
          >
            easyfit Winery Shop
          </Typography>
          <Typography fontSize={13}>Unique wine for unique people.</Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        pt={6}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="stretch"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingY={1}
        >
          <Typography>Total Items</Typography>
          <Typography>{totalItems}</Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingY={1}
        >
          <Typography>Sub total</Typography>
          <CurrencyFormat
            value={initValue}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
        </Box>
        <Divider />
        <Box
          paddingY={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Tax</Typography>
          <CurrencyFormat
            value={tax}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
        </Box>
        <Divider />
        <Box
          paddingY={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Total</Typography>
          <CurrencyFormat
            value={tax + initValue}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
        </Box>
        <Toolbar />
        <Toolbar />
        <Box
          paddingY={1}
          display="flex"
          marginTop="auto"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={() => setOpenShipping(true)}>
            <DeliveryDining />
          </IconButton>

          <Button
            onClick={() => setOpenProceed(true)}
            variant="contained"
            sx={{ textTransform: "capitalize" }}
          >
            Proceed
          </Button>
        </Box>
      </Box>
    </div>
  );
};

const SalesDashboard = () => {
  const [list, setList] = React.useState([]);
  const [keyword, setKeyword] = React.useState(null);
  const [totalItems, setTotalItems] = React.useState(1);
  const { productsData } = useSelector((state) => state.products);
  const { triggerPOS } = useSelector((state) => state.sales);
  const { initValue } = useSelector((state) => state.sales);
  const { userData } = useSelector((state) => state.user);
  const [tax, setTax] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setTriggerPOS("product"));
  }, [dispatch]);

  React.useEffect(() => {
    if (initValue) {
      setTax(0.075 * initValue);
    }
  }, [initValue]);

  React.useEffect(() => {
    if (productsData) {
      setList(productsData);
    }
    if (userData) {
      setTotalItems(userData?.sales?.length);
    }
  }, [productsData, userData]);

  const handleSearch = (e) => {
    let { value } = e?.target;
    setKeyword(value);
    if (productsData) {
      let filtered = productsData?.filter((item) =>
        item?.name.toLowerCase().includes(value?.toLowerCase())
      );
      setList(filtered);
    }
  };

  return (
    <Container disableGutters>
      <Box width="100%" height="96vh" paddingY={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <Card elevation={4}>
              <Box
                padding={2}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
                height="100%"
              >
                <TextField
                  variant="outlined"
                  onChange={handleSearch}
                  value={keyword}
                  fullWidth
                  size="medium"
                  placeholder="Type product name here"
                />
                <Toolbar />
                <div
                  style={{
                    width: "100%",
                    height: 375,
                    overflow: "auto",
                  }}
                >
                  {list && (
                    <Grid
                      container
                      spacing={{ xs: 2, md: 2 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {list?.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <ItemCard
                            item={item}
                            userData={userData}
                            list={list}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </div>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <Card elevation={4}>
              <Box
                padding={2}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
                height="100%"
              >
                <div
                  style={{
                    width: "100%",
                    height: 500,
                    overflow: "auto",
                  }}
                >
                  <POSTable />
                </div>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <Card elevation={4}>
              <Box
                padding={2}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
                height="100%"
              >
                <div
                  style={{
                    width: "100%",
                    height: 500,
                    overflow: "auto",
                  }}
                >
                  <Receipt
                    totalItems={totalItems}
                    userData={userData}
                    initValue={initValue}
                    triggerPOS={triggerPOS}
                    tax={tax}
                  />
                </div>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SalesDashboard;
