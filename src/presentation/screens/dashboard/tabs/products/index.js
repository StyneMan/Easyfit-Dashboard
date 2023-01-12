import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import ProductsTable from "../../../../components/table/products";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

const Products = () => {
  const history = useHistory();

  return (
    <div>
      <Box
        paddingBottom={4}
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          textTransform={"uppercase"}
          variant="h4"
          fontWeight={"700"}
          color="primary.main"
        >
          Products
        </Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => history.push("/dashboard/dwec/products/create")}
        >
          Add Product
        </Button>
      </Box>
      <ProductsTable />
    </div>
  );
};

export default Products;
