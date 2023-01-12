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
} from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import placeholder from "../../../assets/images/placeholder.png";
import NumberFormat from "react-number-format";
import QuillEditor from "../../components/misc/richtext/quill";
import { useHistory } from "react-router-dom";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

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

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

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

const AddProductForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formValues, setFormValues] = React.useState({
    name: "",
    menu: "",
    quantity: 0,
    discountType: "None",
    discountPrice: 0,
    discountPercent: "",
  });
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previewImage, setPreviewImage] = React.useState(placeholder);
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState(null);
  const [enableField, setEnableField] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const { menuData } = useSelector((state) => state.category);

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
    } else if (name === "discountPercent") {
      setFormValues((prevData) => ({
        ...prevData,
        discountPercent: Math.max(0, parseInt(e.target.value))
          .toString()
          .slice(0, 2),
      }));
      //Now calculate discount here
      let quo = value / 100;
      let divis = price * quo;
      let result = price - divis;
      // console.log("Dis Pr::", result);
      setFormValues((prevData) => ({
        ...prevData,
        discountPrice: result,
      }));
    } else {
      if (name === "discountType") {
        if (value === "Fixed price") {
          //Enable the tf here
          setEnableField(false);
        } else {
          if (value === "None") {
            setFormValues((prevData) => ({
              ...prevData,
              discountPrice: price,
              discountPercent: "",
              discountType: value,
            }));
          }
          setEnableField(true);
        }
      }
      setFormValues((prevData) => ({
        ...prevData,
        [name]: value,
        discountPrice: price,
      }));
    }
    // console.log("DT::", formValues.discountType);
  };

  const createProduct = (e) => {
    setIsUploading(true);
    const timeNow = new Date();
    //First upload images to firebase storage then save to firestore
    let storageRef = ref(storage, "products/" + timeNow.getTime());
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
        console.log(error);
        enqueueSnackbar(
          `${error?.message || "Check your internet connection"}`,
          { variant: "error" }
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploading(false);
          setIsLoading(true);
          setDoc(doc(db, "products", `${timeNow.getTime()}`), {
            id: "" + timeNow.getTime(),
            name: formValues.name,
            image: downloadURL,
            menu: formValues.menu,
            description: description,
            price: parseInt(`${price}`),
            quantity: formValues.quantity,
            discountPercent: formValues.discountPercent,
            discountPrice:
              formValues.discountPrice === 0
                ? parseInt(`${price}`)
                : parseInt(`${formValues.discountPrice}`),
            discountType: formValues.discountType,
          })
            .then((res) => {
              setIsLoading(false);
              enqueueSnackbar(`New product added successfully`, {
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
      <ValidatorForm onSubmit={createProduct}>
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
        <Grid
          container
          spacing={1}
          padding={1}
          display="flex"
          flexDirection="center"
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

        <Grid
          container
          spacing={1}
          padding={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              id="name"
              label="Name"
              size="small"
              maxLength={22}
              variant="outlined"
              value={formValues.name}
              onChange={handleChange}
              name="name"
              fullWidth
              required
              inputProps={{
                maxLength: 22,
              }}
              validators={["required"]}
              errorMessages={["Product name is required"]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.menu}
              onChange={handleChange}
              label="Select Product Menu"
              name="menu"
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Product menu is required"]}
            >
              {menuData &&
                menuData?.map((item, index) => (
                  <MenuItem key={index} value={item?.name}>
                    {item?.name}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>
        </Grid>

        <Grid container spacing={1} padding={1}>
          <Grid item xs={12} sm={6} md={4}>
            <NumberFormat
              customInput={TextField}
              onValueChange={(values) => setPrice(values.value)}
              value={price}
              thousandSeparator={true}
              prefix={"₦"}
              fullWidth
              size="small"
              placeholder="Enter price"
              variant="outlined"
              label="Price"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <TextValidator
                className={classes.mb}
                label="Discount Percent"
                size="small"
                variant="outlined"
                disabled={price !== null && !enableField}
                value={formValues.discountPercent}
                onChange={handleChange}
                name="discountPercent"
                type="number"
                min={0}
                inputProps={{
                  maxLength: 2,
                }}
                style={{ paddingRight: 10 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              display={formValues.discountType === "None" ? "none" : "flex"}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <NumberFormat
                hidden
                customInput={TextField}
                onValueChange={(values) =>
                  setFormValues((prevData) => ({
                    ...prevData,
                    discountPrice: values.value,
                  }))
                }
                value={formValues.discountPrice}
                thousandSeparator={true}
                prefix={"₦"}
                fullWidth
                disabled={price !== null && enableField === true}
                size="small"
                placeholder="Enter price"
                variant="outlined"
                name="discountPrice"
                label="Discount Price"
                required
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={1} padding={1}>
          <Grid item xs={12} sm={6} md={4}>
            <NumberFormat
              customInput={TextField}
              onValueChange={(values) => setPrice(values.value)}
              value={price}
              thousandSeparator={true}
              prefix={"₦"}
              fullWidth
              size="small"
              placeholder="Enter price"
              variant="outlined"
              label="Price"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Typography fontWeight={600}>Discount Type</Typography>
              <RadioGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
                defaultValue={"None"}
                aria-labelledby="demo-customized-radios"
                name="discountType"
                onChange={handleChange}
              >
                {["None", "Percentage", "Fixed price"]?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    value={item}
                    disabled={!price}
                    control={<BpRadio />}
                    label={item === "Percentage" ? "%" : item}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              display={formValues.discountType === "None" ? "none" : "flex"}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {formValues.discountType === "Percentage" && (
                <TextValidator
                  className={classes.mb}
                  label="Discount Percent"
                  size="small"
                  variant="outlined"
                  disabled={price !== null && !enableField}
                  value={formValues.discountPercent}
                  onChange={handleChange}
                  name="discountPercent"
                  type="number"
                  min={0}
                  inputProps={{
                    maxLength: 2,
                  }}
                  style={{ paddingRight: 10 }}
                />
              )}
              {price && (
                <NumberFormat
                  hidden
                  customInput={TextField}
                  onValueChange={(values) =>
                    setFormValues((prevData) => ({
                      ...prevData,
                      discountPrice: values.value,
                    }))
                  }
                  value={formValues.discountPrice}
                  thousandSeparator={true}
                  prefix={"₦"}
                  fullWidth
                  disabled={price !== null && enableField === true}
                  size="small"
                  placeholder="Enter price"
                  variant="outlined"
                  name="discountPrice"
                  label="Discount Price"
                  required
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <br />

        <QuillEditor
          setValue={setDescription}
          placeholder={"Type product description here..."}
        />
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

export default AddProductForm;
