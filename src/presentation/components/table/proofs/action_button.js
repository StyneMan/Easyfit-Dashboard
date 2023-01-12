import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import EmptyModal from "../modal/EmptyModal";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Fade from "@mui/material/Fade";
// import DataPreview from "../miscellaneous/DataPreview";
import CustomDialog from "../../dashboard/dialogs/custom-dialog";
import ProofsPreview from "./preview";

const ActionButton = ({ selected }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPreviewModal, setOpenPreviewModal] = React.useState(false);

  const openAction = Boolean(anchorEl);
  const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  const handleCloseMoreAction = () => {
    setAnchorEl(null);
    setOpenPreviewModal(false);
  };
  const handlePreview = () => {
    setOpenPreviewModal(true);
  };

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
            <ProofsPreview item={selected?.row} setOpen={setOpenPreviewModal} />
          }
          open={openPreviewModal}
          handleClose={handleCloseMoreAction}
        />
      </Menu>
    </>
  );
};

export default ActionButton;
