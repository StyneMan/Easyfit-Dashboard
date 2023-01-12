import React from "react";
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
  setDoc,
  doc,
  uploadBytesResumable,
  getDownloadURL,
  updateDoc,
  arrayUnion,
  getDoc,
} from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import placeholder from "../../../assets/images/placeholder.png";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
// import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { createUser } from "../../../domain/service";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

const AddAgentForm = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  let { item } = location?.state;

  const genders = ["Male", "Female"];

  const [formValues, setFormValues] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    userType: "",
    idcode: "",
    gender: "Male",
    address: "",
  });
  const [showCode, setShowCode] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previewImage, setPreviewImage] = React.useState(placeholder);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { id, name, value } = e.target;

    if (id === "image") {
      try {
        setFile(e.target.files[0]);
        if (e.target?.files[0]) {
          setPreviewImage(URL.createObjectURL(e.target?.files[0]));
        } else {
          setPreviewImage(placeholder);
        }
        setFormValues((prevData) => ({
          ...prevData,
          image: e.target.value,
        }));
      } catch (e) {}
    } else {
      setFormValues((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const createAgent = async (userId) => {
    setIsUploading(true);
    //First upload images to firebase storage then save to firestore
    let storageRef = ref(storage, "delivery_agents/" + userId);
    let uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uprogress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uprogress);
      },
      (error) => {
        setIsUploading(false);
        // console.log(error);
        enqueueSnackbar(
          `${error?.message || "Check your internet connection"}`,
          { variant: "error" }
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setIsUploading(false);
          setIsLoading(true);

          const timeNow = new Date();
          const usersRef = doc(db, "delivery-agency", `${item?.id}`);
          try {
            await updateDoc(usersRef, {
              agents: arrayUnion({
                id: userId,
                firstname: formValues.firstname,
                gender: formValues.gender,
                lastname: formValues?.lastname,
                idcode: formValues.idcode,
                image: downloadURL,
                phone: formValues?.phone,
                address: formValues?.address,
                email: formValues.email,
                password: formValues.password,
                userType: "Delivery Agent",
                isBlocked: false,
                createdAt: timeNow,
              }),
            });
          } catch (error) {
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

  const createAdmin = (e) => {
    const timeNow = new Date();
    createUser(formValues.email, formValues.password)
      .then(async (resp) => {
        try {
          setIsLoading(true);
          await createAgent(resp?.user?.uid);
          await setDoc(doc(db, "users", resp?.user?.uid), {
            id: resp?.user?.uid,
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            phone: formValues.phone,
            email: formValues.email,
            password: formValues.password,
            userType: "Delivery Agent",
            isBlocked: false,
            createdAt: timeNow,
            updatedAt: timeNow,
          }).then(async (result) => {
            setIsLoading(false);
            const docRef = doc(db, "users", resp?.user?.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              enqueueSnackbar(`New delivery agent created successfully`, {
                variant: "success",
              });
              setIsLoading(false);
              history.goBack();
            }
          });
        } catch (error) {
          setIsLoading(false);
          enqueueSnackbar(
            `${error?.message || "Check your internet connection"}`,
            {
              variant: "error",
            }
          );
        }
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar(`${err?.message || "Check your internet connection"}`, {
          variant: "error",
        });
      });
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
      <ValidatorForm onSubmit={createAdmin}>
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
          <Typography variant="h6" fontWeight="600">
            Add Delivery Agent
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
              validators={["required"]}
              errorMessages={["Image is required"]}
              helperText="Featured image"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            {previewImage && (
              <Avatar
                variant="rounded"
                alt="Passport"
                src={previewImage}
                className={classes.image}
              />
            )}
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          spacing={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              className={classes.mb}
              id="firstname"
              label="First name"
              size="small"
              variant="outlined"
              value={formValues.firstname}
              onChange={handleChange}
              name="firstname"
              fullWidth
              required
              validators={["required"]}
              errorMessages={["First name is required"]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              className={classes.mb}
              id="lastname"
              label="Last name"
              size="small"
              variant="outlined"
              value={formValues.lastname}
              onChange={handleChange}
              name="lastname"
              fullWidth
              required
              validators={["required"]}
              errorMessages={["Last name is required"]}
            />
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          spacing={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
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

          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              className={classes.mb}
              id="phone"
              label="Phone number"
              size="small"
              variant="outlined"
              value={formValues.phone}
              onChange={handleChange}
              name="phone"
              fullWidth
              required
              type="phone"
              validators={["required"]}
              errorMessages={["Phone number is required"]}
            />
          </Grid>
        </Grid>

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
              className={classes.mb}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showCode ? "text" : "password"}
              id="password"
              size="small"
              onChange={handleChange}
              value={formValues.password}
              autoComplete="current-password"
              placeholder="Password"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Password is required"]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="toggle code"
                      onClick={() => setShowCode(!showCode)}
                      onMouseDown={() => setShowCode(!showCode)}
                      edge="end"
                    >
                      {showCode ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              //   className={classes.mb}
              label="BVN/NIN"
              size="small"
              variant="outlined"
              value={formValues.idcode}
              onChange={handleChange}
              name="idcode"
              fullWidth
              required
              type="number"
              validators={["required"]}
              errorMessages={["BVN/NIN number is required"]}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.gender}
              onChange={handleChange}
              label="Select Gender"
              name="gender"
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Gender is required"]}
            >
              {genders?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              //   className={classes.mb}
              label="Residential Address"
              size="small"
              variant="outlined"
              value={formValues.address}
              onChange={handleChange}
              name="address"
              fullWidth
              required
              validators={["required"]}
              errorMessages={["Residential address is required"]}
            />
          </Grid>
        </Grid>
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

export default AddAgentForm;
