import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import {
  db,
  ref,
  storage,
  setDoc,
  doc,
  uploadBytesResumable,
  getDownloadURL,
} from "../../../data/firebase/";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";
// import Chip from "@mui/material/Chip";
// import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";
// import FormControl from "@mui/material/FormControl";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

const useStyles = makeStyles((theme) => ({
  image: {
    margin: "0px auto 15px auto",
    width: 128,
    height: 128,
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

const AddDeliveryAgency = () => {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = React.useState({
    name: "",
    image: "",
    address: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previewPassport, setPreviewPassport] = React.useState("");

  // const [warehouses, setWarehouses] = React.useState([]);
  // const [currValue, setCurrValue] = React.useState("");

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

  const createAgency = (e) => {
    setIsUploading(true);
    const timeNow = new Date();
    //First upload image to firebase storage then save to firestore
    const storageRef = ref(storage, "delivery-agency/" + timeNow.getTime());
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uprogress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setProgress(uprogress);
      },
      (error) => {
        // Handle unsuccessful uploads
        setIsUploading(false);
        console.log(error);
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      },
      () => {
        setIsUploading(false);
        setIsLoading(true);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDoc(doc(db, "delivery-agency", `${timeNow.getTime()}`), {
            id: timeNow.getTime(),
            name: formValues.name,
            image: downloadURL,
            address: formValues.address,
            email: formValues.email,
            phone: formValues.phone,
            agents: [],
            createdAt: timeNow,
          })
            .then((res) => {
              setIsLoading(false);
              enqueueSnackbar(`Delivery agency added successfully`, {
                variant: "success",
              });
              history.goBack();
            })
            .catch((error) => {
              setIsLoading(false);
              enqueueSnackbar(
                `${error?.message || "Check your internet connection"}`,
                {
                  variant: "error",
                }
              );
            });
        });
      }
    );
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
      <ValidatorForm onSubmit={createAgency}>
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
            New Delivery Agency
          </Typography>
        </Box>

        <TextValidator
          label="Agency name"
          size="small"
          variant="outlined"
          value={formValues.name}
          onChange={handleChange}
          name="name"
          fullWidth
          required
          validators={["required"]}
          errorMessages={["Agency name is required"]}
        />
        <br />
        <TextValidator
          id="image"
          size="small"
          variant="outlined"
          value={formValues.image}
          name="image"
          type="file"
          fullWidth
          required
          disabled={isLoading}
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
          validators={["required"]}
          errorMessages={["Company logo is required"]}
          helperText="Upload company's image"
        />

        <div>
          {previewPassport && (
            <Avatar
              variant="rounded"
              alt="Passport"
              src={previewPassport}
              className={classes.image}
            />
          )}
        </div>
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
              required
              type="email"
              validators={["required"]}
              errorMessages={["Email address is required"]}
            />
          </Grid>
        </Grid>
        <br />

        {/* <FormControl fullWidth classes={{ root: classes.formControlRoot }}>
          <div className={"container"}>
            {warehouses?.map((item, index) => (
              <Chip
                size="small"
                onDelete={() => handleDelete(item, index)}
                label={item}
              />
            ))}
          </div>
          <Input
            value={currValue}
            onChange={handleChipChange}
            onKeyDown={handleKeyUp}
            title="Delivery Agents"
            required
            placeholder="Enter delivery agent's name, press spacebar to save"
          />
          <br />
        </FormControl> */}

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

export default AddDeliveryAgency;
