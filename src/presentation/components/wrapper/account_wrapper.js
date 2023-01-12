import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import ContentPaste from "@mui/icons-material/ContentPaste";
import {
  AccountCircleSharp,
  ArrowForwardIosRounded,
  BusinessRounded,
  Logout,
} from "@mui/icons-material";
import ProfileDialog from "../dashboard/dialogs/about_dialog";
import TransactionsDialog from "../dashboard/dialogs/about_dialog";
import AboutDialog from "../dashboard/dialogs/about_dialog";
import AboutUs from "../../screens/dashboard/about";
import Profile from "../../screens/dashboard/tabs/profile";
import POSTransactionsTable from "../table/mytransactions";
import { auth } from "../../../data/firebase";
import { useSnackbar } from "notistack";
import { setUserData } from "../../../data/store/slice/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AccountWrapper(props) {
  const [open, setOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openTransactions, setOpenTransaction] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = async () => {
    props.handleBackdrop(true);
    try {
      await auth.signOut();
      dispatch(setUserData(null));
      props.handleBackdrop(false);
      enqueueSnackbar(`Successfully logged out`, { variant: "success" });
      history.replace({
        pathname: "/login",
      });
    } catch (err) {
      enqueueSnackbar(`${err?.message || "Check your internet connection."}`, {
        variant: "error",
      });
    }
  };

  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <ProfileDialog
        open={openProfile}
        handleClose={() => setOpenProfile(false)}
        bodyComponent={<Profile />}
      />
      <TransactionsDialog
        open={openTransactions}
        handleClose={() => setOpenTransaction(false)}
        bodyComponent={<POSTransactionsTable />}
      />
      <AboutDialog
        open={open}
        handleClose={() => setOpen(false)}
        bodyComponent={<AboutUs />}
      />
      <MenuList>
        <MenuItem divider onClick={() => setOpenTransaction(true)}>
          <ListItemIcon>
            <BusinessRounded fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Transactions</ListItemText>
          <ArrowForwardIosRounded fontSize="small" />
        </MenuItem>

        <MenuItem divider onClick={() => setOpenProfile(true)}>
          <ListItemIcon>
            <AccountCircleSharp fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
          <ArrowForwardIosRounded fontSize="small" />
        </MenuItem>

        <MenuItem divider onClick={() => setOpen(true)}>
          <ListItemIcon>
            <ContentPaste fontSize="medium" />
          </ListItemIcon>
          <ListItemText>About Us</ListItemText>
          <ArrowForwardIosRounded fontSize="small" />
        </MenuItem>

        <br />
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
