import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SalesPreview = (props) => {
  let { item, setOpen } = props;

  return (
    <div>
      <Container sx={{ paddingY: 1 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignItems="center"
        >
          <img src={item?.image} alt="" width="30%" />
          <br />
          <Typography>{item?.status}</Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"start"}
          alignItems="start"
          paddingBottom={1}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              ORDER NO:
            </Typography>
            <Typography>{item?.orderNo}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
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
          >
            <Typography pr={2} fontWeight="600">
              PRODUCT NAME
            </Typography>
            <Typography>{item?.name}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              PRODUCT CATEGORY
            </Typography>
            <Typography>{item?.category}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              PRICE
            </Typography>
            <Typography>{item?.price}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              QUANTITY
            </Typography>
            <Typography>{item?.quantity}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              COST
            </Typography>
            <Typography>{item?.cost}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              PAYMENT METHOD
            </Typography>
            <Typography>{item?.paymentMethod}</Typography>
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

export default SalesPreview;
