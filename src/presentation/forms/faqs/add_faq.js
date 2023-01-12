import React from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { db, setDoc, doc } from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress, TextField } from "@mui/material";

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

const AddFAQ = (props) => {
  const classes = useStyles();
  let { setOpen } = props;
  const [formValues, setFormValues] = React.useState({
    question: "",
    answer: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const createFAQ = async (e) => {
    const timeNow = new Date();

    setIsLoading(true);
    try {
      await setDoc(doc(db, "faqs", `${timeNow.getTime()}`), {
        id: timeNow.getTime(),
        question: formValues.question,
        answer: formValues.answer,
        createdAt: timeNow,
        updatedAt: timeNow,
      });
      setOpen(false);
      setIsLoading(false);
      enqueueSnackbar(`FAQ added successfully`, {
        variant: "success",
      });
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
      <ValidatorForm onSubmit={createFAQ}>
        <TextField
          className={classes.mb}
          multiline
          minRows={2}
          label="Question"
          placeholder="Type question here..."
          size="small"
          variant="outlined"
          value={formValues.question}
          onChange={handleChange}
          name="question"
          fullWidth
          required
        />

        <TextField
          className={classes.mb}
          minRows={3}
          label="Answer"
          placeholder="Type answer here..."
          size="small"
          variant="outlined"
          value={formValues.answer}
          onChange={handleChange}
          name="answer"
          fullWidth
          required
          multiline
        />

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

export default AddFAQ;
