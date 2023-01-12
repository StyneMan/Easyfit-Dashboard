import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DeliveryPreview = (props) => {
  let { item, setOpen } = props;

  return (
    <div>
      <Container sx={{ paddingY: 5 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography variant="h4" fontWeight="700" gutterBottom>
            {item?.orderNo}
          </Typography>
          <Typography>{item?.status}</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"start"}
          alignItems="start"
          paddingBottom={2}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography pr={2} fontWeight="600">
              ORDER DATE
            </Typography>
            <Typography>{`${new Date(
              item?.date?.seconds * 1000
            ).toLocaleDateString("en-US")}`}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography pr={2} fontWeight="600">
              DELIVERY ADDRESS
            </Typography>
            <Typography>{item?.address}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography pr={2} fontWeight="600">
              DELIVERY AGENT NAME
            </Typography>
            <Typography>{item?.agentName}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography pr={2} fontWeight="600">
              DELIVERY AGENT PHONE
            </Typography>
            <Typography>{item?.agentPhone}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography fontWeight="600">DESCRIPTION</Typography>
            <Typography gutterBottom>{item?.description}</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent="end"
          alignItems="end"
        >
          <Button variant="contained" onClick={() => setOpen(false)}>
            Done
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default DeliveryPreview;
