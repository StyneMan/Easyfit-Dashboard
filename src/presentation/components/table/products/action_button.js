import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import EmptyModal from "../modal/EmptyModal";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Fade from "@mui/material/Fade";
// import DataPreview from "../miscellaneous/DataPreview";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../../dashboard/dialogs/custom-dialog";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ProductPreview from "./preview";
import { useHistory } from "react-router-dom";

import {
  ref,
  deleteDoc,
  deleteObject,
  doc,
  db,
  storage,
} from "../../../../data/firebase/";

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
    // setOpenEdit(false);
    setOpenPreviewModal(false);
  };
  const handlePreview = () => {
    setOpenPreviewModal(true);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const performDelete = async () => {
    const fileRef = ref(storage, "products/" + selected?.row?.id);

    deleteObject(fileRef)
      .then(async () => {
        // File deleted now delete from firestore,
        try {
          await deleteDoc(doc(db, "products", "" + selected?.row?.id));
          setOpenDelete(false);
          enqueueSnackbar(`Item deleted successfully`, {
            variant: "success",
          });
        } catch (error) {
          setOpenDelete(false);
          enqueueSnackbar(
            `${
              error?.message || "Not deleted. Check your network connection!"
            } `,
            {
              variant: "error",
            }
          );
        }
      })
      .catch((error) => {
        // console.log("ErR: ", error);
        enqueueSnackbar(
          `${error?.message || "Check your internet connection"}`,
          {
            variant: "error",
          }
        );
      });
  };

  const renderDeleteConfirm = (
    <div className={classes.awardRoot}>
      <Typography>
        {`Are you sure you want to delete this product ${selected?.row?.id}? \nAction cannot be undone`}
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
            <ProductPreview
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
                    pathname: `/dashboard/dwec/products/:${selected?.row?.id}/edit`,
                    state: {
                      id: selected?.row?.id,
                      name: selected?.row?.name,
                      category: selected?.row?.category,
                      quantity: selected?.row?.quantity,
                      desc: selected?.row?.description,
                      amnt: selected?.row?.price,
                      img: selected?.row?.image,
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
                title="Delete Product"
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
