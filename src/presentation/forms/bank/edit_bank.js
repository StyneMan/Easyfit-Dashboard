import React from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { db, doc, updateDoc } from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress, Divider, Grid, TextField } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { ArrowBack } from "@mui/icons-material";

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

const EditBankInfo = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  let {
    bankName1,
    bankBranch1,
    accountName1,
    accountNumber1,
    bankName2,
    bankBranch2,
    accountName2,
    accountNumber2,
  } = location?.state;

  const [formValues, setFormValues] = React.useState({
    bankName1: bankName1,
    bankBranch1: bankBranch1,
    accountName1: accountName1,
    accountNumber1: accountNumber1,
    bankName2: bankName2,
    bankBranch2: bankBranch2,
    accountName2: accountName2,
    accountNumber2: accountNumber2,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateBank = async (e) => {
    setIsLoading(true);
    try {
      const mRef = doc(db, "cms", "bank");
      await updateDoc(mRef, {
        bankName1: formValues.bankName1,
        bankBranch1: formValues.bankBranch1,
        accountName1: formValues.accountName1,
        accountNumber1: formValues.accountNumber1,
        bankName2: formValues.bankName2,
        bankBranch2: formValues.bankBranch2,
        accountName2: formValues.accountName2,
        accountNumber2: formValues.accountNumber2,
      });

      setIsLoading(false);
      enqueueSnackbar(`Bank info updated successfully`, {
        variant: "success",
      });
      history.goBack();
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
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
      <ValidatorForm onSubmit={updateBank}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="start"
          alignItems="center"
        >
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </Box>
        <br />
        <Divider />
        <br />
        <Grid
          container
          spacing={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              className={classes.mb}
              multiLine
              minRows={2}
              label="Bank Name"
              placeholder="Enter name of first bank here..."
              size="small"
              variant="outlined"
              value={formValues.bankName1}
              onChange={handleChange}
              name="bankName1"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              className={classes.mb}
              multiLine
              minRows={2}
              label="Bank Branch"
              placeholder="Enter branch of first bank here..."
              size="small"
              variant="outlined"
              value={formValues.bankBranch1}
              onChange={handleChange}
              name="bankBranch1"
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              className={classes.mb}
              multiLine
              minRows={2}
              label="Account Name"
              placeholder="Enter name of first account here..."
              size="small"
              variant="outlined"
              value={formValues.accountName1}
              onChange={handleChange}
              name="accountName1"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              className={classes.mb}
              multiLine
              minRows={2}
              label="Bank Branch"
              placeholder="Enter number of first account here..."
              size="small"
              variant="outlined"
              value={formValues.accountNumber1}
              onChange={handleChange}
              name="accountNumber1"
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <br />
        <Divider />
        <br />

        <Grid
          container
          spacing={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              className={classes.mb}
              multiLine
              minRows={2}
              label="Bank Name"
              placeholder="Enter name of second bank here..."
              size="small"
              variant="outlined"
              value={formValues.bankName2}
              onChange={handleChange}
              name="bankName2"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              className={classes.mb}
              multiLine
              minRows={2}
              label="Bank Branch"
              placeholder="Enter branch of second bank here..."
              size="small"
              variant="outlined"
              value={formValues.bankBranch2}
              onChange={handleChange}
              name="bankBranch2"
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              className={classes.mb}
              multiLine
              minRows={2}
              label="Account Name"
              placeholder="Enter name of first account here..."
              size="small"
              variant="outlined"
              value={formValues.accountName1}
              onChange={handleChange}
              name="accountName1"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              className={classes.mb}
              multiLine
              minRows={2}
              label="Bank Branch"
              placeholder="Enter number of first account here..."
              size="small"
              variant="outlined"
              value={formValues.accountNumber1}
              onChange={handleChange}
              name="accountNumber1"
              fullWidth
              required
            />
          </Grid>
        </Grid>

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

export default EditBankInfo;
