import React from "react";
import { Collapse, Drawer as MUIDrawer, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import logo from "../../../../assets/images/splash_logo.png";

import { useSnackbar } from "notistack";
import Skeleton from "@mui/material/Skeleton";

import { auth } from "../../../../data/firebase";
import { useDispatch, useSelector } from "react-redux";
// import { setUserData } from "../../../../data/store/slice/user";
import {
  AccountCircle,
  BikeScooter,
  Category,
  ContentPaste,
  Dashboard,
  ExpandLess,
  ExpandMore,
  ListAlt,
  ShoppingCart,
  Support,
  VerifiedUser,
} from "@mui/icons-material";
import { setUserData } from "../../../../data/store/slice/user";

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
  },
  toolbar: theme.mixins.toolbar,
  listRoot: {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

const Drawer1 = (props) => {
  const classes = useStyles();
  const { history, mobileOpen, setMobileOpen } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openCMS, setOpenCMS] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [drawerItems, setDrawerItems] = React.useState([]);

  const { userData } = useSelector((state) => state.user);

  React.useLayoutEffect(() => {
    if (userData) {
      if (userData?.userType === "Admin") {
        setDrawerItems([
          {
            text: "Dashboard",
            icon: (
              <Dashboard
                style={
                  selectedIndex === 0
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec",
            hasChildren: false,
          },
          {
            text: "CMS",
            icon: (
              <ContentPaste
                style={
                  selectedIndex === 1
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "",
            hasChildren: true,
            children: [
              { title: "AdsManager", to: "/dashboard/dwec/cms/ads" },
              { title: "Blog", to: "/dashboard/dwec/cms/blog" },
              { title: "Contact us", to: "/dashboard/dwec/cms/contact-us" },
              {
                title: "Privacy Policy",
                to: "/dashboard/dwec/cms/privacy-policy",
              },
            ],
          },
          {
            text: "Category",
            icon: (
              <Category
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/category",
            hasChildren: false,
          },
          {
            text: "Products",
            icon: (
              <ListAlt
                style={
                  selectedIndex === 2
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "",
            hasChildren: true,
            children: [
              { title: "Products", to: "/dashboard/dwec/products" },
              { title: "Add New", to: "/dashboard/dwec/products/create" },
              {
                title: "Bulk Upload",
                to: "/dashboard/dwec/products/bulk-upload",
              },
            ],
          },
          {
            text: "Orders",
            icon: (
              <ShoppingCart
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/orders",
            hasChildren: false,
          },
          {
            text: "Deliveries",
            icon: (
              <BikeScooter
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/deliveries",
            hasChildren: false,
          },
          {
            text: "User Management",
            icon: (
              <VerifiedUser
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/users",
            hasChildren: false,
          },
          {
            text: "Support",
            icon: (
              <Support
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/support",
            hasChildren: false,
          },
          {
            text: "Profile",
            icon: (
              <AccountCircle
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/profile",
            hasChildren: false,
          },
        ]);
      } else if (userData?.userType === "POS Agent") {
        setDrawerItems([
          {
            text: "Dashboard",
            icon: (
              <Dashboard
                style={
                  selectedIndex === 0
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec",
            hasChildren: false,
          },
          {
            text: "Products",
            icon: (
              <ListAlt
                style={
                  selectedIndex === 2
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/products",
            hasChildren: false,
          },
          {
            text: "Orders",
            icon: (
              <ShoppingCart
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/orders",
            hasChildren: false,
          },
          {
            text: "Deliveries",
            icon: (
              <BikeScooter
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/deliveries",
            hasChildren: false,
          },
          {
            text: "Profile",
            icon: (
              <AccountCircle
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/profile",
            hasChildren: false,
          },
        ]);
      } else if (userData?.userType === "Manager") {
        setDrawerItems([
          {
            text: "Dashboard",
            icon: (
              <Dashboard
                style={
                  selectedIndex === 0
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec",
            hasChildren: false,
          },
          {
            text: "CMS",
            icon: (
              <ContentPaste
                style={
                  selectedIndex === 1
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "",
            hasChildren: true,
            children: [
              { title: "Blog", to: "/dashboard/dwec/cms/blog" },
              { title: "Contact us", to: "/dashboard/dwec/cms/contact-us" },
              {
                title: "Privacy Policy",
                to: "/dashboard/dwec/cms/privacy-policy",
              },
            ],
          },
          {
            text: "Products",
            icon: (
              <ListAlt
                style={
                  selectedIndex === 2
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "",
            hasChildren: true,
            children: [
              { title: "Products", to: "/dashboard/dwec/products" },
              { title: "Add New", to: "/dashboard/dwec/products/create" },
              {
                title: "Bulk Upload",
                to: "/dashboard/dwec/products/bulk-upload",
              },
            ],
          },
          {
            text: "Orders",
            icon: (
              <ShoppingCart
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/orders",
            hasChildren: false,
          },
          {
            text: "Deliveries",
            icon: (
              <BikeScooter
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/deliveries",
            hasChildren: false,
          },
          {
            text: "Support",
            icon: (
              <Support
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/support",
            hasChildren: false,
          },
          {
            text: "Profile",
            icon: (
              <AccountCircle
                style={
                  selectedIndex === 3
                    ? { color: "#4C3992" }
                    : { color: "black" }
                }
              />
            ),
            to: "/dashboard/dwec/profile",
            hasChildren: false,
          },
        ]);
      }
    }
  }, [selectedIndex, setDrawerItems, userData]);

  const handleCMS = () => {
    setOpenCMS(!openCMS);
  };

  const handleProduct = () => {
    setOpenProducts(!openProducts);
  };

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

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
                return text === "CMS" || text === "Products" ? (
                  <div>
                    <ListItem
                      button
                      style={{ borderRadius: 6 }}
                      selected={selectedIndex === index}
                      onClick={text === "CMS" ? handleCMS : handleProduct}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                      {(text === "CMS" ? openCMS : openProducts) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                    <Collapse
                      in={text === "CMS" ? openCMS : openProducts}
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
                              <ListItemText primary={title} />
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
                    style={{ borderRadius: 6 }}
                    selected={selectedIndex === index}
                    onClick={() => handleListItemClick(to, index)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
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
          marginTop: "auto",
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
      variant={props.drawerVariant}
      container={container}
      className={classes.drawer}
      anchor={props.anchor}
      open={mobileOpen}
      onClose={props.handleDrawerToggle}
      classes={{ paper: classes.drawerPaper }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {myDrawer}
    </MUIDrawer>
  );
};

export default withRouter(Drawer1);
