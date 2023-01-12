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
import logo from "../../../../assets/images/splash_logo.png";

import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useSnackbar } from "notistack";

import { auth } from "../../../../data/firebase";
import { setUserData } from "../../../../data/store/slice/user";

// import pattern from "../../../../assets/images/pattern.png";
import {
  AccountCircle,
  BikeScooter,
  Category,
  ContentPaste,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Inventory,
  ListAlt,
  Payment,
  ShoppingBag,
  ShoppingCart,
  Support,
  VerifiedUser,
} from "@mui/icons-material";

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
    backgroundColor: "#9A031E",
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
  const [openStocks, setOpenStocks] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
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
            to: "/dashboard/dwec",
            hasChildren: false,
          },
          {
            text: "CMS",
            icon: <ContentPaste style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "AdsManager", to: "/dashboard/dwec/cms/ads" },
              { title: "Bank", to: "/dashboard/dwec/cms/bank" },
              { title: "Blog", to: "/dashboard/dwec/cms/blog" },
              { title: "FAQ's", to: "/dashboard/dwec/cms/faq" },
              { title: "Contact us", to: "/dashboard/dwec/cms/contact-us" },
              {
                title: "Privacy Policy",
                to: "/dashboard/dwec/cms/privacy-policy",
              },
            ],
          },
          {
            text: "Category",
            icon: <Category style={{ color: "white" }} />,
            to: "/dashboard/dwec/category",
            hasChildren: false,
          },
          {
            text: "Products",
            icon: <ListAlt style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Products", to: "/dashboard/dwec/products" },
              { title: "Add New", to: "/dashboard/dwec/products/create" },
            ],
          },
          {
            text: "Orders",
            icon: <ShoppingCart style={{ color: "white" }} />,
            to: "/dashboard/dwec/orders",
            hasChildren: false,
          },
          {
            text: "Proof of Payments",
            icon: <Payment style={{ color: "white" }} />,
            to: "/dashboard/dwec/payment-proofs",
            hasChildren: false,
          },
          {
            text: "Sales",
            icon: <ShoppingBag style={{ color: "white" }} />,
            to: "/dashboard/dwec/sales",
            hasChildren: false,
          },
          {
            text: "Deliveries",
            icon: <BikeScooter style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Deliveries", to: "/dashboard/dwec/deliveries" },
              {
                title: "Delivery Agencies",
                to: "/dashboard/dwec/delivery-agencies",
              },
              {
                title: "Add Delivery Agency",
                to: "/dashboard/dwec/deliveries-agencies/create",
              },
            ],
          },
          {
            text: "Inventory/Stocks",
            icon: <Inventory style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Stocks", to: "/dashboard/dwec/stocks" },
              { title: "Add Stock", to: "/dashboard/dwec/stocks/create" },
              {
                title: "Suppliers",
                to: "/dashboard/dwec/stocks/suppliers",
              },
            ],
          },
          {
            text: "User Management",
            icon: <VerifiedUser style={{ color: "white" }} />,
            to: "/dashboard/dwec/users",
            hasChildren: false,
          },
          {
            text: "Support",
            icon: <Support style={{ color: "white" }} />,
            to: "/dashboard/dwec/support",
            hasChildren: false,
          },
          {
            text: "Profile",
            icon: <AccountCircle style={{ color: "white" }} />,
            to: "/dashboard/dwec/profile",
            hasChildren: false,
          },
        ]);
      } else if (userData?.userType === "POS Agent") {
        setDrawerItems([
          {
            text: "Dashboard",
            icon: <Dashboard style={{ color: "white" }} />,
            to: "/dashboard/dwec",
            hasChildren: false,
          },
          {
            text: "Products",
            icon: <ListAlt style={{ color: "white" }} />,
            to: "/dashboard/dwec/products",
            hasChildren: false,
          },
          {
            text: "Sales",
            icon: <ShoppingBag style={{ color: "white" }} />,
            to: "/dashboard/dwec/sales",
            hasChildren: false,
          },
          {
            text: "Orders",
            icon: <ShoppingCart style={{ color: "white" }} />,
            to: "/dashboard/dwec/orders",
            hasChildren: false,
          },
          {
            text: "Deliveries",
            icon: <BikeScooter style={{ color: "white" }} />,
            to: "/dashboard/dwec/deliveries",
            hasChildren: false,
          },
          {
            text: "Profile",
            icon: <AccountCircle style={{ color: "white" }} />,
            to: "/dashboard/dwec/profile",
            hasChildren: false,
          },
        ]);
      } else if (userData?.userType === "Manager") {
        setDrawerItems([
          {
            text: "Dashboard",
            icon: <Dashboard style={{ color: "white" }} />,
            to: "/dashboard/dwec",
            hasChildren: false,
          },
          {
            text: "CMS",
            icon: <ContentPaste style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Blog", to: "/dashboard/dwec/cms/blog" },
              { title: "FAQ's", to: "/dashboard/dwec/cms/faq" },
              { title: "Contact us", to: "/dashboard/dwec/cms/contact-us" },
              {
                title: "Privacy Policy",
                to: "/dashboard/dwec/cms/privacy-policy",
              },
            ],
          },
          {
            text: "Products",
            icon: <ListAlt style={{ color: "white" }} />,
            to: "",
            hasChildren: true,
            children: [
              { title: "Products", to: "/dashboard/dwec/products" },
              { title: "Add New", to: "/dashboard/dwec/products/create" },
            ],
          },
          {
            text: "Orders",
            icon: <ShoppingCart style={{ color: "white" }} />,
            to: "/dashboard/dwec/orders",
            hasChildren: false,
          },
          {
            text: "Proof of Payments",
            icon: <Payment style={{ color: "white" }} />,
            to: "/dashboard/dwec/payment-proofs",
            hasChildren: false,
          },
          {
            text: "Deliveries",
            icon: <BikeScooter style={{ color: "white" }} />,
            to: "/dashboard/dwec/deliveries",
            hasChildren: false,
          },
          {
            text: "User Management",
            icon: <VerifiedUser style={{ color: "white" }} />,
            to: "/dashboard/dwec/users",
            hasChildren: false,
          },
          {
            text: "Support",
            icon: <Support style={{ color: "white" }} />,
            to: "/dashboard/dwec/support",
            hasChildren: false,
          },
          {
            text: "Profile",
            icon: <AccountCircle style={{ color: "white" }} />,
            to: "/dashboard/dwec/profile",
            hasChildren: false,
          },
        ]);
      }
    }
  }, [selectedIndex, setDrawerItems, userData]);

  React.useLayoutEffect(() => {
    if (userData && userData?.userType === "Admin") {
      if (location.pathname.includes("dwec/home")) {
        setSelectedIndex(0);
      } else if (location.pathname.includes("dwec/cms")) {
        setSelectedIndex(1);
      } else if (location.pathname.includes("dwec/category")) {
        setSelectedIndex(2);
      } else if (location.pathname.includes("dwec/products")) {
        setSelectedIndex(3);
      } else if (location.pathname.includes("dwec/orders")) {
        setSelectedIndex(4);
      } else if (location.pathname.includes("dwec/payment-proofs")) {
        setSelectedIndex(5);
      } else if (location.pathname.includes("dwec/sales")) {
        setSelectedIndex(6);
      } else if (location.pathname.includes("dwec/deliveries")) {
        setSelectedIndex(7);
      } else if (location.pathname.includes("dwec/stocks")) {
        setSelectedIndex(8);
      } else if (location.pathname.includes("dwec/users")) {
        setSelectedIndex(9);
      } else if (location.pathname.includes("dwec/support")) {
        setSelectedIndex(10);
      } else if (location.pathname.includes("dwec/profile")) {
        setSelectedIndex(11);
      }
    } else {
      if (location.pathname.includes("/dashboard/dwec/home")) {
        setSelectedIndex(0);
      } else if (location.pathname.includes("/dashboard/dwec/cms")) {
        setSelectedIndex(1);
      } else if (location.pathname.includes("/dashboard/dwec/category")) {
        setSelectedIndex(2);
      } else if (location.pathname.includes("/dashboard/dwec/products")) {
        setSelectedIndex(3);
      } else if (location.pathname.includes("/dashboard/dwec/orders")) {
        setSelectedIndex(4);
      } else if (location.pathname.includes("/dashboard/dwec/payment-proofs")) {
        setSelectedIndex(5);
      } else if (location.pathname.includes("/dashboard/dwec/deliveries")) {
        setSelectedIndex(6);
      } else if (location.pathname.includes("/dashboard/dwec/users")) {
        setSelectedIndex(7);
      } else if (location.pathname.includes("/dashboard/dwec/support")) {
        setSelectedIndex(8);
      } else if (location.pathname.includes("/dashboard/dwec/profile")) {
        setSelectedIndex(9);
      }
    }
  }, [location, userData]);

  const handleCMS = () => {
    setOpenCMS(!openCMS);
  };

  const handleProduct = () => {
    setOpenProducts(!openProducts);
  };

  const handleDelivery = () => {
    setOpenDeliveries(!openDeliveries);
  };

  const handleStock = () => {
    setOpenStocks(!openStocks);
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
        <a href="/">
          <img src={logo} style={{ width: 144 }} alt="site logo" />
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
                  (text === "Deliveries" && userData?.userType === "Admin") ? (
                  <div>
                    <ListItem
                      button
                      style={{
                        borderRadius: 6,
                        backgroundColor:
                          selectedIndex === index ? "black" : "transparent",
                      }}
                      selected={selectedIndex === index}
                      onClick={
                        text === "CMS"
                          ? handleCMS
                          : text === "Products"
                          ? handleProduct
                          : text === "Deliveries"
                          ? handleDelivery
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
                        selectedIndex === index ? "black" : "transparent",
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
          marginRight: "auto",
          justifyContent: "left",
          alignItems: "start",
          padding: 16,
        }}
      >
        <Button
          startIcon={<PowerSettingsNewIcon />}
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
