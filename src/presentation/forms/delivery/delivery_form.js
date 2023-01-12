import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import React from "react";
import {
  SelectValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { db } from "../../../data/firebase";

const DeliveryForm = (props) => {
  const { setOpen, order } = props;
  const history = useHistory();
  const [formValues, setFormValues] = React.useState({
    agencyValue: "",
    agentValue: "",
  });
  const [agencyData, setAgencyData] = React.useState(null);
  const [agentData, setAgentData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { deliveryAgenciesData } = useSelector((state) => state.delivery);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  React.useEffect(() => {
    // if (formValues.agencyValue) {
    const filt = deliveryAgenciesData?.filter(
      (item) => item?.name === formValues.agencyValue
    );
    setAgencyData(filt[0]);
    console.log("TDFD", filt);
    // }
    if (formValues.agentValue) {
      const filter = filt[0]?.agents?.filter(
        (item) => item?.id === formValues.agentValue
      );
      setAgentData(...filter);
    }
  }, [
    agencyData,
    deliveryAgenciesData,
    formValues.agencyValue,
    formValues.agentValue,
  ]);

  const createDelivery = (e) => {
    setLoading(true);
    const timeNow = new Date();

    setDoc(doc(db, "deliveries", `${timeNow.getTime()}`), {
      id: timeNow.getTime(),
      order: order,
      agency: agencyData,
      agent: agentData,
      status: "Pending",
      createdAt: timeNow,
    })
      .then(async (res) => {
        //Update the order's status to in delivery.
        const mRef = doc(db, "orders", "" + order.id);
        try {
          await updateDoc(mRef, {
            status: "In Delivery",
          });
          //Send email to customer here informinhg them that order is placed for delivery.
          setLoading(false);
          setOpen(false);
          enqueueSnackbar(`Order assigned for delivery`, {
            variant: "success",
          });
          history.goBack();
        } catch (error) {
          enqueueSnackbar(
            `${error?.message || "Error. Check internet connection."}`,
            {
              variant: "error",
            }
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(
          `${error?.message || "Check your internet connection"}`,
          {
            variant: "error",
          }
        );
      });
  };

  return (
    <div style={{ width: 620, height: 175 }}>
      <Backdrop style={{ zIndex: 1200 }} open={loading}>
        {loading ? (
          <CircularProgress
            size={90}
            thickness={3.0}
            style={{ color: "white" }}
          />
        ) : (
          <div />
        )}
      </Backdrop>
      <ValidatorForm onSubmit={createDelivery}>
        <Grid
          container
          spacing={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="start"
              alignItems="center"
            >
              <Typography
                gutterBottom={true}
                textTransform="uppercase"
                color="primary.main"
                pr={2}
              >
                Delivery Agency:
              </Typography>
              <SelectValidator
                margin="normal"
                value={formValues.agencyValue}
                onChange={handleChange}
                label="Select Delivery Agency"
                name="agencyValue"
                fullWidth
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Delivery agency is required"]}
              >
                {deliveryAgenciesData &&
                  deliveryAgenciesData?.map((item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="start"
              alignItems="center"
            >
              <Typography
                gutterBottom={true}
                textTransform="uppercase"
                color="primary.main"
                pr={2}
              >
                Delivery Agent:
              </Typography>
              <SelectValidator
                margin="normal"
                value={formValues.agentValue}
                onChange={handleChange}
                label="Select Delivery Agent"
                name="agentValue"
                fullWidth
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Delivery agent is required"]}
              >
                {deliveryAgenciesData &&
                  agencyData?.agents?.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {`${item?.firstname} ${item?.lastname}`}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Box>
          </Grid>
        </Grid>
        <br />
        <Button disabled={loading} variant="contained" type="submit">
          Submit Form
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default DeliveryForm;
