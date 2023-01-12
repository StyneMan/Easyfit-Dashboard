import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import SupportsTable from "../../../../components/table/support";

const Support = () => {
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
          Help & Support
        </Typography>
      </Box>
      <SupportsTable />
    </div>
  );
};

export default Support;
