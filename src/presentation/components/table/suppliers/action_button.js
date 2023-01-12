import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Fade from "@mui/material/Fade";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../../dashboard/dialogs/custom-dialog";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import SuppliersPreview from "./preview";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPreviewModal, setOpenPreviewModal] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const openAction = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useSelector((state) => state.user);
  const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  const handleCloseMoreAction = () => {
    setAnchorEl(null);
    setOpenPreviewModal(false);
  };

  const handlePreview = () => {
    setOpenPreviewModal(true);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const performDelete = async () => {
    try {
      //   const mRef = doc(db, "orders", "" + selected?.row?.id);
      //   await updateDoc(mRef, {
      //     status: "Cancelled",
      //   });
      //   enqueueSnackbar(`${"Order cancelled successfully!"}`, {
      //     variant: "success",
      //   });
    } catch (error) {
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  const renderDeleteConfirm = (
    <div className={classes.awardRoot}>
      <Typography>
        {`Are you sure you want to delete this supplier ${selected?.row?.name}? Action cannot be undone`}
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
        <MenuItem onClick={handlePreview}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Preview" />
        </MenuItem>
        <CustomDialog
          title="Preview Data"
          bodyComponent={
            <SuppliersPreview
              item={selected?.row}
              setOpen={setOpenPreviewModal}
            />
          }
          open={openPreviewModal}
          handleClose={handleCloseMoreAction}
        />
        {userData && userData?.userType === "Admin" && selected?.row ? (
          <div>
            <>
              <MenuItem
                onClick={() =>
                  history.push({
                    pathname:
                      "/dashboard/dwec/stocks/suppliers/" +
                      selected?.row?.id +
                      "/edit",
                    state: {
                      id: selected?.row?.id,
                      name: selected?.row?.name,
                      image: selected?.row?.image,
                      address: selected?.row?.address,
                      email: selected?.row?.email,
                      phone: selected?.row?.phone,
                    },
                  })
                }
              >
                <ListItemIcon>
                  <Edit fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
            </>
            <>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <Delete fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
              <CustomDialog
                title="Delete Stock"
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
