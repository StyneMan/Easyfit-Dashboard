import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

function getModalStyle() {
  return {
    //top: `${top}%`,
    margin: "auto",
    minWidth: 100,
    //left: `${left}%`,
    //transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 16,
    padding: theme.spacing(2),
  },
}));

const CustomDialog = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { title, open, handleClose, bodyComponent } = props;

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          style={{ fontFamily: "roboto", fontWeight: "600" }}
        >
          {title}
        </Typography>

        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <br />
      {bodyComponent}
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        disablePortal={true}
        disableEscapeKeyDown={true}
        // disableBackdropClick={false}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default CustomDialog;
