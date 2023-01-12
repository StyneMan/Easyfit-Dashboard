import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import CompletedDeliveriesTable from "../../../../components/table/delivery-dashboard/completed";

const CompletedDeliveries = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      padding={2}
    >
      <Box width="100%" bgcolor={"#66bb6a"} padding={1} borderRadius={5}>
        <Typography variant="h5" color={"white"}>
          Completed Deliveries
        </Typography>
      </Box>
      <br />
      <CompletedDeliveriesTable />
    </Box>
  );
};

export default CompletedDeliveries;
