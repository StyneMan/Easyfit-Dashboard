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
import CustomDialog from "../../../dashboard/dialogs/custom-dialog";

// import { db, deleteObject, doc, ref, storage, updateDoc } from "../../../../../data/firebase";
import { useHistory } from "react-router-dom";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

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

const ActionButton = ({ selected, agencyId }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const performDelete = async () => {};

  const renderDeleteConfirm = (
    <div className={classes.awardRoot}>
      <Typography>
        {`Are you sure you want to delete this agency ${selected?.row?.id}?`}
      </Typography>
      <Typography gutterBottom>Action cannot be undone.</Typography>
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
        <MenuItem
          onClick={() =>
            history.push({
              pathname:
                "/dashboard/dwec/delivery-agencies/:" +
                agencyId +
                "/agents/:" +
                selected.row.id,
              state: {
                item: selected?.row,
                agencyId: agencyId,
              },
            })
          }
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Preview" />
        </MenuItem>

        {userData && userData?.userType === "Admin" && selected?.row ? (
          <div>
            <MenuItem
              onClick={() =>
                history.push({
                  pathname:
                    "/dashboard/dwec/deliveries-agencies/:" +
                    agencyId +
                    "/agents/:" +
                    selected.row.id +
                    "/edit",
                  state: {
                    item: selected?.row,
                    agencyId: agencyId,
                  },
                })
              }
            >
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>

            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <Delete fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </MenuItem>
            <CustomDialog
              title="Delete Agent"
              bodyComponent={renderDeleteConfirm}
              open={openDelete}
              handleClose={() => setOpenDelete(false)}
            />
          </div>
        ) : null}
      </Menu>
    </>
  );
};

export default ActionButton;
