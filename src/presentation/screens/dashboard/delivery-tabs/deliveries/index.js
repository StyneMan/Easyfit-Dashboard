import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import MyDeliveriesTable from "../../../../components/table/delivery-dashboard";

const MyDeliveries = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      padding={2}
    >
      <Box width="100%" bgcolor={"#29b6f6"} padding={1} borderRadius={5}>
        <Typography variant="h5" color={"white"}>
          All My Deliveries
        </Typography>
      </Box>
      <br />
      <MyDeliveriesTable />
    </Box>
  );
};

export default MyDeliveries;
