import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import CancelledDeliveriesTable from "../../../../components/table/delivery-dashboard/cancelled";

const CancelledDeliveries = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      padding={2}
    >
      <Box width="100%" bgcolor={"#f44336"} padding={1} borderRadius={5}>
        <Typography variant="h5" color={"white"}>
          Cancelled Deliveries
        </Typography>
      </Box>
      <br />
      <CancelledDeliveriesTable />
    </Box>
  );
};

export default CancelledDeliveries;
