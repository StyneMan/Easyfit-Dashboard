import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const StockPreview = (props) => {
  let { item, setOpen } = props;
  const [image, setImage] = React.useState("");
  const { productsData } = useSelector((state) => state.products);

  React.useEffect(() => {
    if (productsData) {
      let ite = productsData?.filter((val) => val?.id === item?.product);
      console.log("PROD::", ite);
      setImage(ite[0]?.image);
    }
  }, [item?.product, productsData]);

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
          {productsData && image && <img src={image} alt="" width="30%" />}
          <br />
          {item && <Typography>{item?.status}</Typography>}
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
              STOCK ID:
            </Typography>
            <Typography>{item?.id}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              PRODUCT ID
            </Typography>
            <Typography>{item?.product}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              SUPPLIER
            </Typography>
            <Typography>{item?.supplier}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              WAREHOUSE
            </Typography>
            <Typography>{item?.warehouse}</Typography>
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
              CREATED ON
            </Typography>
            <Typography>{`${new Date(
              item?.createdAt?.seconds * 1000
            ).toLocaleDateString("en-US")}`}</Typography>
          </Box>

          {/* {/*          
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography pr={2} fontWeight="600">
              PAYMENT METHOD
            </Typography>
            <Typography>{item?.paymentMethod}</Typography> *
          </Box> */}
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

export default StockPreview;
