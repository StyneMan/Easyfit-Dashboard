import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { db, doc, updateDoc } from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import { CircularProgress, Grid, MenuItem, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import QuillEditable from "../../components/misc/richtext/edit_quill";

const useStyles = makeStyles((theme) => ({
  image: {
    margin: "0px auto 15px auto",
    width: 120,
    height: 100,
  },
  mb: {
    marginBottom: 10,
  },
}));

const EditStockForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  let {
    product,
    supplier,
    warehouse,
    quantity,
    prodName,
    id,
    price,
    cost,
    summary,
  } = location?.state;

  const [formValues, setFormValues] = React.useState({
    productName: prodName,
    product: product,
    supplier: supplier,
    warehouse: warehouse,
    quantity: quantity,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [summaryBody, setSummaryBody] = React.useState(summary);
  const [wareh, setWareH] = React.useState([]);
  const [unitPrice, setUnitPrice] = React.useState(price);
  const [total, setTotal] = React.useState(cost);
  const { enqueueSnackbar } = useSnackbar();

  const { productsData } = useSelector((state) => state.products);
  const { suppliersData } = useSelector((state) => state.suppliers);

  React.useEffect(() => {
    if (suppliersData) {
      const filter = suppliersData?.filter(
        (item) => item?.name === formValues.supplier
      );
      let item = filter[0];
      setWareH(item?.warehouses);
    }
  }, [formValues.supplier, suppliersData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
    if (name === "supplier") {
      const filter = suppliersData?.filter((item) => item?.name === value);
      let item = filter[0];
      setWareH(item?.warehouses);
    }
    if (name === "quantity") {
      var tota = value * unitPrice;
      setTotal(tota);
    }
    if (name === "product") {
      if (productsData) {
        let data = productsData?.filter((elem) => elem.id === value);
        setFormValues((prevData) => ({
          ...prevData,
          productName: data[0]?.name,
        }));
      }
    }
  };

  const updateStock = async (e) => {
    const timeNow = new Date();
    setIsLoading(true);

    const mRef = doc(db, "stocks", "" + id);

    try {
      await updateDoc(mRef, {
        prodName: formValues.productName,
        product: formValues.product,
        supplier: formValues.supplier,
        warehouse: formValues.warehouse,
        quantity: parseInt(`${formValues.quantity}`),
        unitPrice: parseInt(`${formValues.unitPrice}`),
        cost: parseInt(`${total}`),
        updatedAt: timeNow,
        summary: summaryBody,
      });
      setIsLoading(false);
      enqueueSnackbar(`Stock updated successfully`, {
        variant: "success",
      });
      history.goBack();
    } catch (e) {
      setIsLoading(false);
      enqueueSnackbar(`${e?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Backdrop style={{ zIndex: 1200 }} open={isLoading}>
        {isLoading ? (
          <CircularProgress
            size={90}
            thickness={3.0}
            style={{ color: "white" }}
          />
        ) : (
          <div />
        )}
      </Backdrop>
      <ValidatorForm onSubmit={updateStock}>
        <Box
          width={"100%"}
          display="flex"
          flexDirection="row"
          justifyContent="start"
          alignItems={"start"}
          paddingBottom={2}
        >
          <Button
            variant="text"
            startIcon={<ArrowBackIosNew />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
          <Typography
            px={4}
            textTransform={"uppercase"}
            variant="h6"
            fontWeight="700"
            color="primary.main"
          >
            New Stock
          </Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              className={classes.mb}
              value={formValues.supplier}
              onChange={handleChange}
              label="Select supplier"
              name="supplier"
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Supplier is required"]}
            >
              {suppliersData &&
                (suppliersData ?? [])?.map((item, index) => (
                  <MenuItem key={index} value={item?.name ?? ""}>
                    {item?.name ?? ""}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              className={classes.mb}
              value={formValues.warehouse}
              onChange={handleChange}
              label="Select Warehouse"
              name="warehouse"
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Warehouse is required"]}
            >
              {suppliersData &&
                formValues.supplier &&
                wareh?.map((item, index) => (
                  <MenuItem key={index} value={item ?? ""}>
                    {item ?? ""}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>
        </Grid>

        <Grid container spacing={1} marginBottom={1}>
          <Grid item xs={12} sm={6} md={6}>
            <div>
              <SelectValidator
                className={classes.mb}
                value={formValues.product}
                onChange={handleChange}
                label="Select product"
                name="product"
                fullWidth
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Product is required"]}
              >
                {productsData &&
                  (productsData ?? [])?.map((item, index) => (
                    <MenuItem key={index} value={item?.id ?? ""}>
                      {item?.name ?? ""}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <div>
              <TextValidator
                className={classes.mb}
                label="Quantity"
                size="small"
                variant="outlined"
                value={formValues.quantity}
                onChange={handleChange}
                name="quantity"
                fullWidth
                required
                type="number"
                validators={["required"]}
                errorMessages={["Quantity is required image is required"]}
              />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={1} marginBottom={1}>
          <Grid item xs={12} sm={6} md={6}>
            <NumberFormat
              customInput={TextField}
              onValueChange={(values) => {
                setUnitPrice(values.value);
                setTotal(values.value * formValues.quantity);
              }}
              value={unitPrice}
              thousandSeparator={true}
              prefix={"₦"}
              fullWidth
              disabled
              size="small"
              placeholder="Enter unit price"
              variant="outlined"
              label="Price"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <NumberFormat
              customInput={TextField}
              onValueChange={(values) => {}}
              value={total}
              thousandSeparator={true}
              prefix={"₦"}
              fullWidth
              disabled={true}
              size="small"
              placeholder="Total price"
              variant="outlined"
              label="Total Amount"
              required
            />
          </Grid>
        </Grid>

        <QuillEditable value={summaryBody} setValue={setSummaryBody} />

        <br />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          fullWidth
        >
          Save
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default EditStockForm;
