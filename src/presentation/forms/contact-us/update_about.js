import React from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import { db, doc, updateDoc } from "../../../data/firebase/";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import QuillEditable from "../../components/misc/richtext/edit_quill";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/system/Box";

const UpdateAboutForm = () => {
  const location = useLocation();
  const history = useHistory();
  let { body } = location.state;

  const [isLoading, setIsLoading] = React.useState(false);
  const [aboutBody, setAboutBody] = React.useState(body);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  const updatePolicy = async (e) => {
    setIsLoading(true);

    // const timeNow = new Date();
    const mRef = doc(db, "cms", "about");
    try {
      await updateDoc(mRef, {
        body: aboutBody,
      });
      history.goBack();
      setIsLoading(false);
      enqueueSnackbar(`About us updated successfully`, {
        variant: "success",
      });
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(
        `${error?.message || "Error. Check internet connection."}`,
        {
          variant: "error",
        }
      );
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
      <ValidatorForm onSubmit={updatePolicy}>
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
        <QuillEditable value={aboutBody} setValue={setAboutBody} />
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

export default UpdateAboutForm;
