import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import ProofsTable from "../../../../components/table/proofs";

const PaymentProofs = () => {
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
          Proofs of Payment
        </Typography>
      </Box>
      <ProofsTable />
    </div>
  );
};

export default PaymentProofs;
