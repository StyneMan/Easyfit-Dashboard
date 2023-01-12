import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const FAQPreview = (props) => {
  let { item, setOpen } = props;

  return (
    <div>
      <Container sx={{ paddingY: 1 }}>
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
              QUESTION
            </Typography>
            <Typography>{item?.question}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              ANSWER
            </Typography>
            <Typography>{item?.answer}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              CREATED ON
            </Typography>
            <Typography>{`${new Date(
              item?.createdAt?.seconds * 1000
            ).toLocaleDateString("en-US")}`}</Typography>
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

export default FAQPreview;
