import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Fade from "@mui/material/Fade";
// import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import CustomDialog from "../../dashboard/dialogs/custom-dialog";
import Edit from "@mui/icons-material/Edit";
import StockPreview from "./preview";
import { useHistory } from "react-router-dom";

const ActionButton = ({ selected }) => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPreviewModal, setOpenPreviewModal] = React.useState(false);
  //
  const openAction = Boolean(anchorEl);
  // const { enqueueSnackbar } = useSnackbar();
  const { userData } = useSelector((state) => state.user);
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
            <StockPreview item={selected?.row} setOpen={setOpenPreviewModal} />
          }
          open={openPreviewModal}
          handleClose={handleCloseMoreAction}
        />
        {userData && userData?.userType === "Admin" && selected?.row ? (
          <div>
            <MenuItem
              onClick={() =>
                history.push({
                  pathname:
                    "/dashboard/easyfit/stocks/:" + selected?.row?.id + "/edit",
                  state: {
                    product: selected?.row?.product,
                    supplier: selected?.row?.supplier,
                    warehouse: selected?.row?.warehouse,
                    quantity: selected?.row?.quantity,
                    prodName: selected?.row?.prodName,
                    id: selected?.row?.id,
                    price: selected?.row?.unitPrice,
                    cost: selected?.row?.cost,
                    summary: selected?.row?.summary,
                  },
                })
              }
            >
              <ListItemIcon>
                <Edit fontSize="small" color="success" />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
          </div>
        ) : null}
      </Menu>
    </>
  );
};

export default ActionButton;
