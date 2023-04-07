import React from "react";
import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Container, Toolbar } from "@mui/material";
// import curve from "../../../../../assets/images/signup_top.png";
import AdsSlider from "./components/ads_slider";
import { useSelector } from "react-redux";
import LowStock from "./components/low_stock";

const ItemCard = (props) => {
  let { title, value } = props;

  return (
    <Card elevation={2} sx={{ backgroundColor: "#40898A" }}>
      <div
        style={{
          position: "relative",
        }}
      >
        {/* <div style={{ position: "absolute", top: 0, left: 0 }}>
          <img src={curve} alt="" width={144} />
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            fontWeight={"700"}
            variant={"h4"}
            gutterBottom
            color={"white"}
            pt={2}
            pb={1}
          >
            {title}
          </Typography>
          <Typography variant={"h6"} gutterBottom pb={4} color={"white"}>
            {value}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

const HomePage = () => {
  const { salesData } = useSelector((state) => state.sales);
  const { ordersData } = useSelector((state) => state.orders);
  const { deliveryData } = useSelector((state) => state.delivery);
  const { productsData } = useSelector((state) => state.products);

  return (
    <div>
      <Container sx={{ paddingBottom: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4} md={3}>
            <ItemCard title="Orders" value={ordersData?.length} />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ItemCard title="Products" value={productsData?.length} />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ItemCard title="Deliveries" value={deliveryData?.length} />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ItemCard title="Sales" value={salesData?.length} />
          </Grid>
        </Grid>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7}>
            <LowStock />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            {/* Ads slider here */}
            <AdsSlider />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
