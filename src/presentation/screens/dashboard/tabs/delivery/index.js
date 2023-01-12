import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import DeliveriesTable from "../../../../components/table/deliveries";

const Delivery = () => {
  return (
    <div>
      <Box
        paddingBottom={4}
        display="flex"
        flexDirection={"row"}
        justifyContent="start"
        alignItems="start"
      >
        <Typography
          textTransform={"uppercase"}
          variant="h4"
          fontWeight={"700"}
          color="primary.main"
        >
          Deliveries
        </Typography>
      </Box>
      <DeliveriesTable />
    </div>
  );
};

export default Delivery;
