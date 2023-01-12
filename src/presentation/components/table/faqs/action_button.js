import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";

import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../../dashboard/dialogs/custom-dialog";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { db, deleteDoc, doc } from "../../../../data/firebase";
import EditFAQ from "../../../forms/faqs/edit_faq";

const useStyles = makeStyles((theme) => ({
  awardRoot: {
    display: "flex",
    flexDirection: "column",
  },
  awardRow: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ActionButton = ({ selected }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const openAction = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useSelector((state) => state.user);
  const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  const handleCloseMoreAction = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const performDelete = async () => {
    try {
      await deleteDoc(doc(db, "faqs", "" + selected?.row?.id));
      setOpenDelete(false);
      enqueueSnackbar(`${"FAQ deleted successfully!"}`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  const renderDeleteConfirm = (
    <div className={classes.awardRoot}>
      <Typography width={320}>
        {`Are you sure you want to delete this faq \nAction cannot be undone`}
      </Typography>
      <div className={classes.awardRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="error"
          onClick={() => setOpenDelete(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="success"
          onClick={performDelete}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <IconButton
        aria-label="actions"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleMoreAction}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openAction}
        onClose={handleCloseMoreAction}
        TransitionComponent={Fade}
        elevation={1}
      >
        {userData &&
        (userData?.userType === "Admin" || userData?.userType === "Manager") &&
        selected?.row ? (
          <div>
            <>
              <MenuItem onClick={() => setOpenEdit(true)}>
                <ListItemIcon>
                  <Edit fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
              <CustomDialog
                title="Update Frequently Asked Question (FAQ)"
                bodyComponent={
                  <EditFAQ
                    setOpen={setOpenEdit}
                    question={selected?.row?.question}
                    answer={selected?.row?.answer}
                    id={selected?.row?.id}
                  />
                }
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
              />
            </>
            <>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <Delete fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
              <CustomDialog
                title="Delete FAQ"
                bodyComponent={renderDeleteConfirm}
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
              />
            </>
          </div>
        ) : null}
      </Menu>
    </>
  );
};

export default ActionButton;
