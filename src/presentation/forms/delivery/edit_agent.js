import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import {
  db,
  ref,
  storage,
  doc,
  uploadBytesResumable,
  getDownloadURL,
  updateDoc,
  deleteObject,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from "../../../data/firebase/";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import { MenuItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  image: {
    margin: "0px auto 15px auto",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
}));

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        {...props}
        size={90}
        thickness={3.0}
        style={{ color: "green" }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          component="div"
          style={{ color: "white", fontFamily: "roboto" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const EditAgentForm = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  let { item, agencyId } = location?.state;

  const [formValues, setFormValues] = React.useState({
    fname: item?.firstname,
    lname: item?.lastname,
    image: "",
    address: item?.address,
    phone: item?.phone,
    email: item?.email,
    idcode: item?.idcode,
    gender: item?.gender,
  });
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previewPassport, setPreviewPassport] = React.useState("");

  let gender = ["Male", "Female"];

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { id, name, value } = e.target;

    if (id === "image") {
      try {
        if (e.target.files[0]) {
          setFile(e.target.files[0]);
          setPreviewPassport(URL.createObjectURL(e.target.files[0]));
        } else {
          setPreviewPassport("");
        }
      } catch (e) {}
      setFormValues((prevData) => ({
        ...prevData,
        image: e.target.value,
      }));
    } else {
      setFormValues((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const uploadNew = (e) => {
    setIsUploading(true);
    const timeNow = new Date();

    let storageRef = ref(storage, "delivery_agents/" + timeNow.getTime());
    let uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uprogress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uprogress);
      },
      (error) => {
        setIsUploading(false);
        // console.log(error);
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      },
      () => {
        setIsUploading(false);
        setIsLoading(true);
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const mRef = doc(db, "users", `${item?.id}`);
          const mRef2 = doc(db, "delivery-agency", `${agencyId}`);
          try {
            //Now update from delivery agency
            await updateDoc(mRef2, {
              agents: arrayRemove(item),
            });

            //Update users collection
            await updateDoc(mRef, {
              firstname: formValues.fname,
              image: downloadURL,
              lastname: formValues.lname,
              address: formValues.address,
              email: formValues.email,
              phone: formValues.phone,
              gender: formValues.gender,
              idcode: formValues.idcode,
              updatedAt: timeNow,
            });

            //Fetch
            onSnapshot(doc(db, "users", "" + item?.id), async (doc) => {
              await updateDoc(mRef2, {
                agents: arrayUnion(doc.data()),
              });
            });

            setIsLoading(false);
            enqueueSnackbar(`Agent updated successfully`, {
              variant: "success",
            });
            history.goBack();
          } catch (error) {
            setIsLoading(false);
            enqueueSnackbar(
              `${error?.message || "Check your internet connection!"}`,
              {
                variant: "error",
              }
            );
          }
        });
      }
    );
  };

  const updateAgent = async (e) => {
    setIsLoading(true);

    if (!previewPassport) {
      const timeNow = new Date();
      console.log("IDDDD: ", item);
      const mRef = doc(db, "users", "" + item?.id);
      const mRef2 = doc(db, "delivery-agency", "" + agencyId);
      try {
        await updateDoc(mRef2, {
          agents: arrayRemove(item),
        });

        //Update users collection
        await updateDoc(mRef, {
          firstname: formValues.fname,
          lastname: formValues.lname,
          address: formValues.address,
          phone: formValues.phone,
          gender: formValues.gender,
          idcode: formValues.idcode,
          image: item?.image,
          updatedAt: timeNow,
        });

        //Fetch
        onSnapshot(doc(db, "users", "" + item?.id), async (doc) => {
          await updateDoc(mRef2, {
            agents: arrayUnion(doc.data()),
          });
        });

        setIsLoading(false);
        enqueueSnackbar(`Agent updated successfully`, {
          variant: "success",
        });
        history.goBack();
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar(
          `${error?.message || "Check your internet connection!"}`,
          {
            variant: "error",
          }
        );
      }
    } else {
      console.log("IDDDD2: ", item);
      const fileRef = ref(storage, "delivery_agents/" + item?.id);

      deleteObject(fileRef)
        .then(() => {
          setIsLoading(false);
          uploadNew();
        })
        .catch((error) => {
          setIsLoading(false);
          enqueueSnackbar(
            `${error?.message || "Check your internet connection!"}`,
            {
              variant: "error",
            }
          );
        });
    }
  };

  return (
    <div>
      <Backdrop style={{ zIndex: 1200 }} open={isUploading || isLoading}>
        {isUploading ? <CircularProgressWithLabel value={progress} /> : <div />}
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
      <ValidatorForm onSubmit={updateAgent}>
        <Box
          width={"100%"}
          display="flex"
          flexDirection="row"
          justifyContent="start"
          alignItems={"start"}
          paddingBottom={2}
        >
          <Button
            variant="contained"
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
            Update Agent Info
          </Typography>
        </Box>
        <br />
        <Grid
          container
          spacing={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              id="image"
              size="small"
              variant="outlined"
              value={formValues.image}
              name="image"
              type="file"
              fullWidth
              disabled={isLoading}
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
              helperText="Upload agent's image"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div>
              <Avatar
                variant="rounded"
                alt="Passport"
                src={previewPassport ? previewPassport : item?.image}
                className={classes.image}
              />
            </div>
          </Grid>
        </Grid>

        <br />

        <Grid
          spacing={1}
          marginBottom={0}
          container
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              label="Firstname"
              size="small"
              variant="outlined"
              value={formValues.fname}
              onChange={handleChange}
              name="fname"
              fullWidth
              required
              validators={["required"]}
              errorMessages={["First name is required"]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              label="Last name"
              size="small"
              variant="outlined"
              value={formValues.lname}
              onChange={handleChange}
              name="lname"
              fullWidth
              required
              validators={["required"]}
              errorMessages={["Last name is required"]}
            />
          </Grid>
        </Grid>

        <br />

        <TextValidator
          className={classes.mb}
          label="Address"
          size="small"
          variant="outlined"
          required
          value={formValues.address}
          onChange={handleChange}
          name="address"
          fullWidth
          validators={["required"]}
          errorMessages={["Address is required"]}
        />
        <br />

        <Grid container spacing={1} padding={0} marginBottom={0}>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              className={classes.mb}
              label="Phone number"
              size="small"
              variant="outlined"
              required
              value={formValues.phone}
              onChange={handleChange}
              name="phone"
              fullWidth
              validators={["required"]}
              errorMessages={["Phone number is required"]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              className={classes.mb}
              id="email"
              label="Email address"
              size="small"
              variant="outlined"
              value={formValues.email}
              onChange={handleChange}
              name="email"
              fullWidth
              disabled
              required
              type="email"
              validators={["required"]}
              errorMessages={["Email address is required"]}
            />
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          spacing={1}
          padding={0}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              className={classes.mb}
              label="BVN/NIN"
              size="small"
              variant="outlined"
              required
              value={formValues.idcode}
              onChange={handleChange}
              name="idcode"
              fullWidth
              validators={["required"]}
              errorMessages={["BVN/NIN number is required"]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.gender}
              onChange={handleChange}
              label="Select gender"
              name="gender"
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Gender is required"]}
            >
              {(item?.gender || gender) &&
                gender?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>
        </Grid>
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || isUploading}
          fullWidth
        >
          Save
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default EditAgentForm;
