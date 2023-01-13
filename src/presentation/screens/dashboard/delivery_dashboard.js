import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
// import image from "../../../assets/images/easyfit_round.png";
import {
  AccountCircle,
  BikeScooter,
  CancelOutlined,
  Dashboard,
  DoneAllOutlined,
  PendingOutlined,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { auth } from "../../../data/firebase";
import { setUserData } from "../../../data/store/slice/user";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { Avatar, Button, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import DeliveryHome from "./delivery-tabs/home";
import CompletedDeliveries from "./delivery-tabs/deliveries/completed";
import PendingDeliveries from "./delivery-tabs/deliveries/pending";
import CancelledDeliveries from "./delivery-tabs/deliveries/cancelled";
import MyDeliveries from "./delivery-tabs/deliveries";
import Profile from "./tabs/profile";

const drawerWidth = 275;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "275px",
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#9A031E",
  },
  toolbar: theme.mixins.toolbar,
  listRoot: {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

function DeliveryDashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [drawerItems, setDrawerItems] = React.useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useLayoutEffect(() => {
    setDrawerItems([
      {
        text: "Dashboard",
        icon: <Dashboard />,
        to: "/dashboard/easyfit",
        hasChildren: false,
      },
      {
        text: "Completed Deliveries",
        icon: <DoneAllOutlined />,
        to: "/dashboard/easyfit/completed-deliveries",
        hasChildren: false,
      },
      {
        text: "Pending Deliveries",
        icon: <PendingOutlined />,
        to: "/dashboard/easyfit/pending-deliveries",
        hasChildren: false,
      },
      {
        text: "Cancelled Deliveries",
        icon: <CancelOutlined />,
        to: "/dashboard/easyfit/cancelled-deliveries",
        hasChildren: false,
      },
      {
        text: "All My Deliveries",
        icon: <BikeScooter />,
        to: "/dashboard/easyfit/all-deliveries",
        hasChildren: false,
      },
      {
        text: "Profile",
        icon: <AccountCircle />,
        to: "/dashboard/easyfit/profile",
        hasChildren: false,
      },
    ]);
  }, []);

  React.useLayoutEffect(() => {
    if (location.pathname.includes("/dashboard/easyfit/home")) {
      setSelectedIndex(0);
    } else if (
      location.pathname.includes("/dashboard/easyfit/completed-deliveries")
    ) {
      setSelectedIndex(1);
    } else if (
      location.pathname.includes("/dashboard/easyfit/pending-deliveries")
    ) {
      setSelectedIndex(2);
    } else if (
      location.pathname.includes("/dashboard/easyfit/cancelled-deliveries")
    ) {
      setSelectedIndex(3);
    } else if (
      location.pathname.includes("/dashboard/easyfit/all-deliveries")
    ) {
      setSelectedIndex(4);
    } else if (location.pathname.includes("/dashboard/easyfit/profile")) {
      setSelectedIndex(5);
    }
  }, [location]);

  const handleListItemClick = (to, index) => {
    history.push(to);
    setSelectedIndex(index);
    setMobileOpen(!mobileOpen);
  };

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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const initials =
    userData?.firstname?.slice(0, 1).toUpperCase() +
    userData?.lastname?.slice(0, 1).toUpperCase();

  // let fullname = userData?.firstname + " " + userData?.lastname;

  const drawer = (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <br />
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
        paddingBottom={2}
      >
        <Avatar
          src={userData?.image !== "" ? userData?.image : ""}
          style={{
            width: 60,
            height: 60,
            borderRadius: 60 / 2,
            fontSize: 48,
          }}
        >
          {userData?.image !== "" ? "" : initials}
        </Avatar>
        <Typography color="primary.main" fontWeight="500">
          {`Hello, ${userData?.firstname} ${userData?.lastname}`}
        </Typography>
      </Box>
      <Divider />
      <br />
      <List className={classes.listRoot}>
        {drawerItems &&
          drawerItems?.map((item, index) => {
            const { text, icon, to } = item;
            if (userData) {
              return (
                <ListItem
                  button
                  key={index}
                  style={{
                    borderRadius: 6,
                    backgroundColor:
                      selectedIndex === index ? "black" : "transparent",
                  }}
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(to, index)}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedIndex === index ? "white" : "primary.main",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      color: selectedIndex === index ? "white" : "primary.main",
                    }}
                  />
                </ListItem>
              );
            } else {
              return (
                <Skeleton
                  key={index}
                  component="li"
                  variant="rect"
                  animation="wave"
                  height={30}
                  style={{ margin: 10 }}
                />
              );
            }
          })}
      </List>
      <br />
      <Divider />
      <br />
      <div
        style={{
          flexDirection: "column",
          // marginTop: "auto",
          margin: "auto",
          justifyContent: "left",
          alignItems: "start",
          padding: 16,
        }}
      >
        <Button
          startIcon={<PowerSettingsNew />}
          sx={{
            textTransform: "none",
            color: "white",
            backgroundColor: "black",
          }}
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {userData?.userType}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <main>
          <Switch>
            <Redirect
              exact
              from="/dashboard/easyfit"
              to="/dashboard/easyfit/home"
            />
            <Route path="/dashboard/easyfit/home" exact={true}>
              <DeliveryHome />
            </Route>
            <Route path="/dashboard/easyfit/completed-deliveries" exact={true}>
              <CompletedDeliveries />
            </Route>
            <Route path="/dashboard/easyfit/pending-deliveries" exact={true}>
              <PendingDeliveries />
            </Route>
            <Route path="/dashboard/easyfit/cancelled-deliveries" exact={true}>
              <CancelledDeliveries />
            </Route>
            <Route path="/dashboard/easyfit/all-deliveries" exact={true}>
              <MyDeliveries />
            </Route>

            <Route path="/dashboard/easyfit/profile" exact={true}>
              <Profile />
            </Route>
          </Switch>
        </main>
      </Box>
    </Box>
  );
}

DeliveryDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DeliveryDashboard;
