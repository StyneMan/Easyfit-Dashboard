import React from "react";
import { Collapse, Drawer as MUIDrawer, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useLocation, withRouter } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import logo from "../../../../assets/images/easylogolight.svg";

import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useSnackbar } from "notistack";

import { auth } from "../../../../data/firebase";
import { setUserData } from "../../../../data/store/slice/user";

import {
  AccountCircle,
  BikeScooter,
  // Category,
  ContentPaste,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Inventory,
  ListAlt,
  Settings,
  ShoppingBag,
  ShoppingCart,
  VerifiedUser,
} from "@mui/icons-material";
import Menu from "@mui/icons-material/Menu";

const drawerWidth = 270;
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
    backgroundColor: theme.palette.primary.main,
  },
  toolbar: theme.mixins.toolbar,
  listRoot: {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

const Drawer2 = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const { history } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openCMS, setOpenCMS] = React.useState(false);
  const [openSales, setOpenSales] = React.useState(false);
  const [openStocks, setOpenStocks] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openDeliveries, setOpenDeliveries] = React.useState(false);
  const [drawerItems, setDrawerItems] = React.useState([]);

  const { userData } = useSelector((state) => state.user);

  React.useLayoutEffect(() => {
    if (userData) {
      // console.log("DAT:", userData);
      if (userData?.userType === "Admin") {
        setDrawerItems([
          {
            text: "Dashboard",
            icon: <Dashboard style={{ color: "white" }} />,
            to: "/dashboard/easyfit",
            hasChildren: false,
          },
          {
            text: "CMS",
            icon: <ContentPaste style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Bank", to: "/dashboard/easyfit/cms/bank" },
              {
                title: "Privacy Policy",
                to: "/dashboard/easyfit/cms/privacy-policy",
              },
            ],
          },
          {
            text: "Menus",
            icon: <Menu style={{ color: "white" }} />,
            to: "/dashboard/easyfit/menu",
            hasChildren: false,
          },
          {
            text: "Products",
            icon: <ListAlt style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Products", to: "/dashboard/easyfit/products" },
              {
                title: "Week's Meal",
                to: "/dashboard/easyfit/products/week-meal",
              },
              { title: "Add New", to: "/dashboard/easyfit/products/create" },
            ],
          },
          {
            text: "Sales",
            icon: <ShoppingBag style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              {
                title: "Orders",
                to: "/dashboard/easyfit/sales/orders",
              },
              {
                title: "POS Sales",
                to: "/dashboard/easyfit/sales/pos-sales",
              },
              {
                title: "Proof of Payments",
                to: "/dashboard/easyfit/sales/payment-proofs",
              },
            ],
          },
          {
            text: "Deliveries",
            icon: <BikeScooter style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Deliveries", to: "/dashboard/easyfit/deliveries" },
              {
                title: "Delivery Agencies",
                to: "/dashboard/easyfit/deliveries/agencies",
              },
              {
                title: "Add Delivery Agency",
                to: "/dashboard/easyfit/deliveries/agencies/create",
              },
            ],
          },
          {
            text: "Inventory/Stocks",
            icon: <Inventory style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Stocks", to: "/dashboard/easyfit/stocks" },
              { title: "Add Stock", to: "/dashboard/easyfit/stocks/create" },
              {
                title: "Suppliers",
                to: "/dashboard/easyfit/stocks/suppliers",
              },
            ],
          },
          {
            text: "User Management",
            icon: <VerifiedUser style={{ color: "white" }} />,
            to: "/dashboard/easyfit/users",
            hasChildren: false,
          },
          {
            text: "Settings",
            icon: <Settings style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              {
                title: "Profile",
                to: "/dashboard/easyfit/settings/profile",
              },
              {
                title: "Delivery Options",
                to: "/dashboard/easyfit/settings/delivery-options",
              },
              {
                title: "Plan Options",
                to: "/dashboard/easyfit/settings/profile",
              },
            ],
          },
        ]);
      } else if (userData?.userType === "POS Agent") {
        setDrawerItems([
          {
            text: "Dashboard",
            icon: <Dashboard style={{ color: "white" }} />,
            to: "/dashboard/easyfit",
            hasChildren: false,
          },
          {
            text: "Products",
            icon: <ListAlt style={{ color: "white" }} />,
            to: "/dashboard/easyfit/products",
            hasChildren: false,
          },
          {
            text: "Sales",
            icon: <ShoppingBag style={{ color: "white" }} />,
            to: "/dashboard/easyfit/sales",
            hasChildren: false,
          },
          {
            text: "Orders",
            icon: <ShoppingCart style={{ color: "white" }} />,
            to: "/dashboard/easyfit/orders",
            hasChildren: false,
          },
          {
            text: "Deliveries",
            icon: <BikeScooter style={{ color: "white" }} />,
            to: "/dashboard/easyfit/deliveries",
            hasChildren: false,
          },
          {
            text: "Profile",
            icon: <AccountCircle style={{ color: "white" }} />,
            to: "/dashboard/easyfit/profile",
            hasChildren: false,
          },
        ]);
      } else if (userData?.userType === "Manager") {
        setDrawerItems([
          {
            text: "Dashboard",
            icon: <Dashboard style={{ color: "white" }} />,
            to: "/dashboard/easyfit",
            hasChildren: false,
          },
          {
            text: "CMS",
            icon: <ContentPaste style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              {
                title: "Privacy Policy",
                to: "/dashboard/easyfit/cms/privacy-policy",
              },
            ],
          },
          {
            text: "Products",
            icon: <ListAlt style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Products", to: "/dashboard/easyfit/products" },
              {
                title: "Week's Meal",
                to: "/dashboard/easyfit/products/week-meal",
              },
              { title: "Add New", to: "/dashboard/easyfit/products/create" },
            ],
          },
          {
            text: "Sales",
            icon: <ShoppingBag style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              {
                title: "Orders",
                to: "/dashboard/easyfit/sales/orders",
              },
              {
                title: "Proof of Payments",
                to: "/dashboard/easyfit/sales/payment-proofs",
              },
            ],
          },
          {
            text: "Deliveries",
            icon: <BikeScooter style={{ color: "white" }} />,
            to: "/dashboard/easyfit/deliveries",
            hasChildren: false,
          },
          {
            text: "User Management",
            icon: <VerifiedUser style={{ color: "white" }} />,
            to: "/dashboard/easyfit/users",
            hasChildren: false,
          },
          {
            text: "Profile",
            icon: <AccountCircle style={{ color: "white" }} />,
            to: "/dashboard/easyfit/profile",
            hasChildren: false,
          },
        ]);
      }
    }
  }, [selectedIndex, setDrawerItems, userData]);

  React.useLayoutEffect(() => {
    if (userData && userData?.userType === "Admin") {
      if (location.pathname.includes("easyfit/home")) {
        setSelectedIndex(0);
      } else if (location.pathname.includes("easyfit/cms")) {
        setSelectedIndex(1);
      } else if (location.pathname.includes("easyfit/menu")) {
        setSelectedIndex(2);
      } else if (location.pathname.includes("easyfit/products")) {
        setSelectedIndex(3);
      } else if (location.pathname.includes("easyfit/sales")) {
        setSelectedIndex(4);
      } else if (location.pathname.includes("easyfit/deliveries")) {
        setSelectedIndex(5);
      } else if (location.pathname.includes("easyfit/stocks")) {
        setSelectedIndex(6);
      } else if (location.pathname.includes("easyfit/users")) {
        setSelectedIndex(7);
      } else if (location.pathname.includes("easyfit/settings")) {
        setSelectedIndex(8);
      }
    } else {
      if (location.pathname.includes("/dashboard/easyfit/home")) {
        setSelectedIndex(0);
      } else if (location.pathname.includes("/dashboard/easyfit/cms")) {
        setSelectedIndex(1);
      } else if (location.pathname.includes("/dashboard/easyfit/category")) {
        setSelectedIndex(2);
      } else if (location.pathname.includes("/dashboard/easyfit/products")) {
        setSelectedIndex(3);
      } else if (location.pathname.includes("/dashboard/easyfit/orders")) {
        setSelectedIndex(4);
      } else if (
        location.pathname.includes("/dashboard/easyfit/payment-proofs")
      ) {
        setSelectedIndex(5);
      } else if (location.pathname.includes("/dashboard/easyfit/deliveries")) {
        setSelectedIndex(6);
      } else if (location.pathname.includes("/dashboard/easyfit/users")) {
        setSelectedIndex(7);
      } else if (location.pathname.includes("/dashboard/easyfit/profile")) {
        setSelectedIndex(8);
      }
    }
  }, [location, userData]);

  const handleCMS = () => {
    setOpenCMS(!openCMS);
  };

  const handleProduct = () => {
    setOpenProducts(!openProducts);
  };

  const handleSales = () => {
    setOpenSales(!openSales);
  };

  const handleDelivery = () => {
    setOpenDeliveries(!openDeliveries);
  };

  const handleStock = () => {
    setOpenStocks(!openStocks);
  };

  const handleSettings = () => {
    setOpenSettings(!openSettings);
  };

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleListItemClick = (to, index) => {
    history.push(to);
    setSelectedIndex(index);
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

  const myDrawer = (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className={classes.toolbar}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <br />
        <a href="/">
          <img src={logo} style={{ width: 156 }} alt="site logo" />
        </a>
      </div>
      <Divider />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List className={classes.listRoot}>
          {drawerItems &&
            drawerItems?.map((item, index) => {
              const { text, icon, to, children } = item;
              if (userData) {
                return text === "CMS" ||
                  (text === "Products" && userData?.userType !== "POS Agent") ||
                  text === "Inventory/Stocks" ||
                  (text === "Deliveries" && userData?.userType === "Admin") ||
                  (text === "Sales" && userData?.userType === "Admin") ||
                  (text === "Settings" && userData?.userType === "Admin") ? (
                  <div>
                    <ListItem
                      button
                      style={{
                        borderRadius: 6,
                        backgroundColor:
                          selectedIndex === index ? "#074647" : "transparent",
                      }}
                      selected={selectedIndex === index}
                      onClick={
                        text === "CMS"
                          ? handleCMS
                          : text === "Products"
                          ? handleProduct
                          : text === "Deliveries"
                          ? handleDelivery
                          : text === "Settings"
                          ? handleSettings
                          : text === "Sales"
                          ? handleSales
                          : handleStock
                      }
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} sx={{ color: "white" }} />
                      {(
                        text === "CMS"
                          ? openCMS
                          : text === "Products"
                          ? openProducts
                          : text === "Deliveries"
                          ? openDeliveries
                          : text === "Settings"
                          ? openSettings
                          : text === "Sales"
                          ? openSales
                          : openStocks
                      ) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                    <Collapse
                      in={
                        text === "CMS"
                          ? openCMS
                          : text === "Products"
                          ? openProducts
                          : text === "Deliveries"
                          ? openDeliveries
                          : text === "Settings"
                          ? openSettings
                          : text === "Sales"
                          ? openSales
                          : openStocks
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {children?.map((it, ke) => {
                          const { title, to } = it;
                          return (
                            <ListItemButton
                              key={ke}
                              sx={{ pl: 4 }}
                              selected={selectedIndex === index}
                              onClick={() => handleListItemClick(to, index)}
                            >
                              <ListItemText
                                primary={title}
                                sx={{ color: "white" }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </div>
                ) : (
                  <ListItem
                    button
                    key={index}
                    style={{
                      borderRadius: 6,
                      backgroundColor:
                        selectedIndex === index ? "#074647" : "transparent",
                    }}
                    selected={selectedIndex === index}
                    onClick={() => handleListItemClick(to, index)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} sx={{ color: "white" }} />
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
      </div>

      <div
        style={{
          flexDirection: "column",
          // marginTop: "auto",
          width: "100%",
          marginRight: "auto",
          justifyContent: "start",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Button
          startIcon={<PowerSettingsNewIcon />}
          sx={{
            textTransform: "none",
            color: "white",
            backgroundColor: "red",
          }}
          fullWidth
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <MUIDrawer
      variant="permanent"
      open
      classes={{ paper: classes.drawerPaper }}
    >
      {myDrawer}
    </MUIDrawer>
  );
};

export default withRouter(Drawer2);
