import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import {
  db,
  ref,
  storage,
  doc,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
  updateDoc,
} from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";

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

const EditMenuForm = (props) => {
  const classes = useStyles();
  let { setOpen, img, name, id, excerpt } = props;
  const [formValues, setFormValues] = React.useState({
    title: name,
    image: "",
    excerpt: excerpt,
  });
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previewPassport, setPreviewPassport] = React.useState("");

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
    //First upload image to firebase storage then save to firestore
    const storageRef = ref(storage, "menus/" + timeNow.getTime());
    const uploadTask = uploadBytesResumable(storageRef, file);

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
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      },
      () => {
        setIsUploading(false);
        setIsLoading(true);
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const mRef = doc(db, "menus", "" + id);
          try {
            await updateDoc(mRef, {
              name: formValues.title,
              excerpt: formValues.excerpt,
              image: downloadURL,
            });
            setOpen(false);
            setIsLoading(false);
            enqueueSnackbar(`Menu updated successfully`, {
              variant: "success",
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
        });
      }
    );
  };

  const updateCategory = async (e) => {
    setIsLoading(true);
    if (!previewPassport) {
      // console.log("ID: ", id);
      const mRef = doc(db, "menus", "" + id);
      try {
        await updateDoc(mRef, {
          name: formValues.title,
          excerpt: formValues.excerpt,
        });
        setOpen(false);
        setIsLoading(false);
        enqueueSnackbar(`Menu updated successfully`, {
          variant: "success",
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
    } else {
      const fileRef = ref(storage, "menus/" + id);

      deleteObject(fileRef)
        .then(() => {
          // File deleted now upload new file,
          //get download url and save to firestore
          setIsLoading(false);
          uploadNew();
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
      <ValidatorForm onSubmit={updateCategory}>
        <TextValidator
          id="title"
          label="Menu name"
          size="small"
          variant="outlined"
          value={formValues.title}
          onChange={handleChange}
          name="title"
          fullWidth
          validators={["required"]}
          errorMessages={["Menu name is required"]}
        />
        <br />

        <TextValidator
          id="excerpt"
          label="Short description"
          size="small"
          variant="outlined"
          value={formValues.excerpt}
          onChange={handleChange}
          name="excerpt"
          fullWidth
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
          disabled={isLoading}
          accept=".png, .jpg, .jpeg, .pdf"
          onChange={handleChange}
          //   validators={["required"]}
          //   errorMessages={["Category image is required"]}
          helperText="Upload menu image"
        />

        <div>
          <Avatar
            variant="rounded"
            alt="Passport"
            src={previewPassport ? previewPassport : img}
            className={classes.image}
          />
        </div>
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

export default EditMenuForm;
