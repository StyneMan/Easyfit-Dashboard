import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SupportsPreview = (props) => {
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
            {item?.ticketNo}
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
              CREATED ON
            </Typography>
            <Typography>{`${new Date(
              item?.createdAt?.seconds * 1000
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
              FULLNAME
            </Typography>
            <Typography>{item?.name}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography pr={2} fontWeight="600">
              EMAIL ADDRESS
            </Typography>
            <Typography>{item?.email}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography pr={2} fontWeight="600">
              PHONE NUMBER
            </Typography>
            <Typography>{item?.phone}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography pr={2} fontWeight="600">
              SUBJECT
            </Typography>
            <Typography>{item?.subject}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems="center"
            py={2}
          >
            <Typography fontWeight="600">MESSAGE</Typography>
            <Typography gutterBottom>{item?.message}</Typography>
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

export default SupportsPreview;
