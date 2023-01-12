import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { db, doc, updateDoc } from "../../../data/firebase/";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory, useLocation } from "react-router-dom";
import Box from "@mui/system/Box";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

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

const ContactUsForm = () => {
  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();
  let { address, phone, phone2, email, website } = location.state;
  const [formValues, setFormValues] = React.useState({
    address: " ",
    phone: " ",
    phone2: " ",
    email: " ",
    website: " ",
    facebook: " ",
    instagram: " ",
    image: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  const updateContactInfo = async (e) => {
    setIsLoading(true);

    // const timeNow = new Date();
    const mRef = doc(db, "cms", "contact-us");
    try {
      await updateDoc(mRef, {
        address: formValues.address === " " ? address : formValues.address,
        phone: formValues.phone === " " ? phone : formValues.phone,
        phone2: formValues.phone2 === " " ? phone2 : formValues.phone2,
        email: formValues.email === " " ? email : formValues.email,
        website: formValues.website === " " ? website : formValues.website,
      });
      history.goBack();
      setIsLoading(false);
      enqueueSnackbar(`Contact info updated successfully`, {
        variant: "success",
      });
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(`${error?.message || "Error updating Contact info"}`, {
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
      <ValidatorForm onSubmit={updateContactInfo}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={"start"}
          alignItems="start"
        >
          <Button
            startIcon={<ArrowBackIosNew />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </Box>
        <br />
        <TextValidator
          className={classes.mb}
          fullWidth
          name="address"
          label="Address"
          value={
            formValues.address === " "
              ? address
              : !formValues.address
              ? ""
              : formValues.address
          }
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["Address is required"]}
        />

        <TextValidator
          className={classes.mb}
          fullWidth
          name="phone"
          label="Phone"
          value={
            formValues.phone === " "
              ? phone
              : !formValues.phone
              ? ""
              : formValues.phone
          }
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["Phone number is required"]}
        />

        <TextValidator
          className={classes.mb}
          fullWidth
          name="phone2"
          label="Phone Line 2"
          value={
            formValues.phone2 === " "
              ? phone2
              : !formValues.phone2
              ? ""
              : formValues.phone2
          }
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["Phone number is required"]}
        />

        <TextValidator
          className={classes.mb}
          fullWidth
          name="email"
          label="Email address"
          value={
            formValues.email === " "
              ? email
              : !formValues.email
              ? ""
              : formValues.email
          }
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["Email address is required"]}
        />

        <TextValidator
          className={classes.mb}
          fullWidth
          name="website"
          label="Website"
          value={
            formValues.website === " "
              ? website
              : !formValues.website
              ? ""
              : formValues.website
          }
          placeholder="https://"
          onChange={handleChange}
          variant="outlined"
          validators={["required"]}
          errorMessages={["Website is required"]}
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

export default ContactUsForm;
