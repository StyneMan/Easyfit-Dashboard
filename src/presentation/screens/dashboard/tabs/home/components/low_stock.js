import React from "react";
import {
  where,
  collection,
  query,
  db,
  getDocs,
} from "../../../../../../data/firebase";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { Button, TextField } from "@mui/material";
import CustomDialog from "../../../../../components/dashboard/dialogs/custom-dialog";

const ItemCard = (props) => {
  let { id, image, name, price, quantity } = props.item;
  return (
    <Card
      elevation={5}
      raised
      sx={{ borderRadius: 4, height: !props.type ? 160 : 186 }}
    >
      <Box
        p={2}
        display={"flex"}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <img src={image} alt="" width={!props.type ? "35%" : "25%"} />
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="end"
        >
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={"600"} gutterBottom>
              {id}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={11} gutterBottom>
              {name}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={11}>{`${quantity} available`}</Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <NumberFormat
              customInput={TextField}
              onValueChange={(values) => 0}
              value={price}
              thousandSeparator={true}
              prefix={"₦"}
              disabled
              size="small"
              variant="filled"
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

const LowStock = () => {
  const [open, setOpen] = React.useState(false);
  const [stockData, setStockData] = React.useState([]);
  const { productsData } = useSelector((state) => state.products);

  const performQuery = async () => {
    const q = query(collection(db, "products"), where("quantity", "<=", 5));
    let arr = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      arr.push(doc.data());
    });
    setStockData(arr);
  };

  React.useEffect(() => {
    if (productsData) {
      //Now perform queries here
      performQuery();
    }
  }, [productsData]);

  return (
    <div>
      <CustomDialog
        open={open}
        handleClose={() => setOpen(false)}
        title="All Products With Stock Quantity Below 5 products in Stock"
        bodyComponent={
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            paddingBottom={1}
            sx={{
              scrollBehavior: "auto",
              overflowY: "scroll",
              whiteSpace: "nowrap",
              maxHeight: `calc(100vh - ${116}px)`,
              maxWidth: `calc(100vw - ${110}px)`,
            }}
          >
            {stockData?.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ItemCard item={item} type={true} />
              </Grid>
            ))}
          </Grid>
        }
      />

      <Typography gutterBottom variant="h6">
        Low Stock Products
      </Typography>
      {stockData && (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            paddingBottom={1}
          >
            {stockData.slice(0, 3)?.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>
          <hr />
          <Button
            variant="contained"
            sx={{ borderRadius: 2, textTransform: "capitalize" }}
            fullWidth
            onClick={() => setOpen(true)}
          >
            View All
          </Button>
        </>
      )}
    </div>
  );
};

export default LowStock;
