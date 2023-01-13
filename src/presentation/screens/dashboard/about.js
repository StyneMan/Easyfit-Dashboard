import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/system/Box";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <Paper>
        <Box
          paddingX={4}
          paddingBottom={8}
          display="flex"
          flexDirection="column"
          justifyContent={"start"}
          alignItems="center"
        >
          <Typography variant="h5" color="primary.main" gutterBottom>
            About Us
          </Typography>
          <Typography>
            easyfit Winery Point Of Sale (POS) dashboard for offline purchase.
          </Typography>
          <Typography>Powered by easyfit Winery</Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default AboutUs;
