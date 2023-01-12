import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import OrdersTable from "../../../../components/table/orders";

const Orders = () => {
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
          Orders
        </Typography>
      </Box>
      <OrdersTable />
    </div>
  );
};

export default Orders;
