import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import PendingDeliveriesTable from "../../../../components/table/delivery-dashboard/pending";

const PendingDeliveries = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      padding={2}
    >
      <Box width="100%" bgcolor={"#ffa726"} padding={1} borderRadius={5}>
        <Typography variant="h5" color={"white"}>
          Pending Deliveries
        </Typography>
      </Box>
      <br />
      <PendingDeliveriesTable />
    </Box>
  );
};

export default PendingDeliveries;
