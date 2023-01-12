import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setSalesDeliveryData } from "../../../data/store/slice/deliveries";

const useStyles = makeStyles((theme) => ({
  image: {
    margin: "0px auto 15px auto",
    width: 128,
    height: 128,
  },
  mb: {
    marginBottom: 10,
  },
}));

const ShippingForm = (props) => {
  const classes = useStyles();
  let { setOpen } = props;
  const [formValues, setFormValues] = React.useState({
    address: "",
    phone: "",
    email: "",
    city: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  const saveShippingInfo = (e) => {
    setIsLoading(true);

    dispatch(
      setSalesDeliveryData({
        address: formValues.address,
        phone: formValues.phone,
        email: formValues.email,
        city: formValues.city,
      })
    );
    setOpen(false);
    setIsLoading(false);
    enqueueSnackbar(`Delivery info added successfully`, {
      variant: "success",
    });
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
      <ValidatorForm onSubmit={saveShippingInfo}>
        <br />
        <TextValidator
          className={classes.mb}
          fullWidth
          required
          name="phone"
          label="Phone"
          value={formValues.phone}
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["Phone number is required"]}
        />

        <TextValidator
          className={classes.mb}
          fullWidth
          required
          name="email"
          label="Email address"
          value={formValues.email}
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["Email address is required"]}
        />

        <TextValidator
          className={classes.mb}
          fullWidth
          required
          name="address"
          label="Address"
          value={formValues.address}
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["Address is required"]}
        />

        <TextValidator
          className={classes.mb}
          fullWidth
          name="city"
          label="City"
          required
          value={formValues.city}
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["City is required"]}
        />

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

export default ShippingForm;
