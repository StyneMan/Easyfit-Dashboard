import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SuppliersPreview = (props) => {
  let { item, setOpen } = props;

  return (
    <div>
      <Container sx={{ paddingY: 1 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignItems="center"
          pb={3}
        >
          <img src={item?.image} alt="" height={150} />
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
              SUPPLIER'S NAME:
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
              EMAIL ADDRESS:
            </Typography>
            <Typography>{item?.email}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              PHONE NUMBER:
            </Typography>
            <Typography>{item?.phone}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              ADDRESS
            </Typography>
            <Typography>{item?.address}</Typography>
          </Box>

          <Typography fontWeight="600" pt={1}>
            WAREHOUSES
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems="center"
          >
            {item &&
              item?.warehouses?.map((val, i) => (
                <>
                  <Typography px={2}>{`${i + 1}.${val}`}</Typography>
                </>
              ))}
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

export default SuppliersPreview;
