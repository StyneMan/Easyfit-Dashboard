import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  AccessTimeOutlined,
  CancelOutlined,
  CheckCircleOutlineOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import MyDeliveriesTable from "../../../../components/table/delivery-dashboard";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";

const ItemCard = (props) => {
  let { bgcolor, title, icon, value } = props;

  const theme = useTheme();

  return (
    <Box
      height={theme.breakpoints.only("xs") ? 144 : 192}
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      bgcolor={bgcolor}
      borderRadius={5}
      padding={2}
    >
      {icon}
      <Typography
        color={"white"}
        fontSize={theme.breakpoints.only("xs") ? 15 : 16}
        lineHeight={1.2}
      >
        {title}
      </Typography>
      <Typography
        color={"white"}
        fontWeight="600"
        fontSize={theme.breakpoints.only("xs") ? 18 : 21}
      >
        {value}
      </Typography>
    </Box>
  );
};

const DeliveryHome = () => {
  const [myDeliveries, setMyDeliveries] = React.useState([]);
  const [pendingDeliveries, setPendingDeliveries] = React.useState([]);
  const [completedDeliveries, setCompletedDeliveries] = React.useState([]);
  const [cancelledDeliveries, setCancelledDeliveries] = React.useState([]);
  const { deliveryData } = useSelector((state) => state.delivery);
  const { userData } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (deliveryData && userData) {
      const deliv = deliveryData?.filter(
        (item) => item.agent.id === userData?.id
      );
      setMyDeliveries(deliv);

      const pending = deliv?.filter((item) => item.status === "Pending");
      setPendingDeliveries(pending);

      const cancelled = deliv?.filter((item) => item.status === "Cancelled");
      setCancelledDeliveries(cancelled);

      const completed = deliv?.filter((item) => item.status === "Completed");
      setCompletedDeliveries(completed);
    }
  }, [deliveryData, userData]);

  return (
    <div>
      <Box
        bgcolor="primary.light"
        paddingY={2}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        <Grid container spacing={{ xs: 2, md: 2 }} sx={{ p: 2 }}>
          <Grid item xs={6} sm={6} md={6}>
            <ItemCard
              title="All Deliveries"
              icon={<InfoOutlined fontSize="large" sx={{ color: "white" }} />}
              value={myDeliveries?.length}
              bgcolor={"#29b6f6"}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <ItemCard
              title="Pending Deliveries"
              icon={
                <AccessTimeOutlined fontSize="large" sx={{ color: "white" }} />
              }
              value={pendingDeliveries?.length}
              bgcolor={"#ffa726"}
            />
          </Grid>
        </Grid>

        <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: 2 }}>
          <Grid item xs={6} sm={6} md={6}>
            <ItemCard
              title="Completed Deliveries"
              icon={
                <CheckCircleOutlineOutlined
                  fontSize="large"
                  sx={{ color: "white" }}
                />
              }
              value={completedDeliveries?.length}
              bgcolor={"#66bb6a"}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <ItemCard
              title="Cancelled Deliveries"
              icon={<CancelOutlined fontSize="large" sx={{ color: "white" }} />}
              value={cancelledDeliveries?.length}
              bgcolor={"#f44336"}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        <Typography
          gutterBottom={true}
          color="primary.main"
          fontWeight={"600"}
          variant="h6"
        >
          Latest Delivery
        </Typography>
        <MyDeliveriesTable />
      </Box>
    </div>
  );
};

export default DeliveryHome;
