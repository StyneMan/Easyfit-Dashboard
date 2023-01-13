import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/system/Box";
import { makeStyles } from "@mui/styles";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Drawer1 from "../../components/dashboard/drawer/Drawer1";
import Drawer2 from "../../components/dashboard/drawer/Drawer2";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import Typography from "@mui/material/Typography";
import HomePage from "./tabs/home";

import PrivacyPolicy from "./tabs/cms/privacy";
import ContactUs from "./tabs/cms/contact";
import AdsManager from "./tabs/cms/ads";
import CreateAdsForm from "../../forms/ads/add_advert_form";
import Products from "./tabs/products";
import Orders from "./tabs/orders";
import Delivery from "./tabs/delivery";
import Category from "./tabs/category";
import Support from "./tabs/support";
import AddProductForm from "../../forms/products/add_product";
import BulkUpload from "./tabs/products/bulk_upload";
import Blog from "./tabs/cms/blog";
import BlogDetail from "./tabs/cms/blog/blog_detail";
import AddBlog from "../../forms/blog/add_blog_post";
import CreateAdminForm from "../../forms/admin/create_admin_form";
import { setProductsData } from "../../../data/store/slice/products";
import { useDispatch, useSelector } from "react-redux";
import {
  setAboutData,
  setAdsData,
  setBankData,
  setBlogData,
  setContactData,
  setFAQData,
  setPrivacyData,
} from "../../../data/store/slice/cms";
import {
  collection,
  db,
  doc,
  query,
  onSnapshot,
  orderBy,
} from "../../../data/firebase";
import { setMenuData } from "../../../data/store/slice/menu";
import {
  setDeliveryAgenciesData,
  setDeliveryData,
} from "../../../data/store/slice/deliveries";
import { setSupportsData } from "../../../data/store/slice/support";
import { setOrdersData } from "../../../data/store/slice/orders";
import ContactUsForm from "../../forms/contact-us";
import UpdatePolicyForm from "../../forms/privacy-policy/update_policy_form";
import Users from "./tabs/users";
import Profile from "./tabs/profile";
import { Avatar, Popper } from "@mui/material";
import Stock from "./tabs/stock";
import { setSuppliersData } from "../../../data/store/slice/suppliers";
import AddStockForm from "../../forms/stock/add_stock";
import { setStocksData } from "../../../data/store/slice/stocks";
import Suppliers from "./tabs/stock/suppliers";
import AddSupplier from "../../forms/stock/add_supplier";
import UpdateAdsForm from "../../forms/ads/update_advert_form";
import UpdateBlog from "../../forms/blog/update_news_form";
import Bank from "./tabs/cms/bank";
import FAQs from "./tabs/cms/faqs";
import Sales from "./tabs/sales";
import { setSalesData } from "../../../data/store/slice/sales";
import { Calculate } from "@mui/icons-material";

import SalesDashboard from "./sales_dashboard";
import PaymentProofs from "./tabs/proofs";
import { setProofsData } from "../../../data/store/slice/proofs";
import UpdateAboutForm from "../../forms/contact-us/update_about";
import DeliveryAgencies from "./tabs/delivery/delivery_agencies";
import AddDeliveryAgency from "../../forms/delivery/add_agency";
import CalculatorWrapper from "../../components/wrapper/calculator_wrapper";
import ClockWrapper from "../../components/wrapper/clock_wrapper";
import AccountWrapper from "../../components/wrapper/account_wrapper";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import { setPOSTransData } from "../../../data/store/slice/pos";
import OrdersPreview from "../../components/table/orders/preview";
import OrderShipping from "./tabs/orders/order_shipping";
import DeliveryAgencyPreview from "../../components/table/delivery-agencies/preview";
import AddAgentForm from "../../forms/delivery/add_agent";
import DeliveryDashboard from "./delivery_dashboard";
import EditProductForm from "../../forms/products/edit_product";
import EditDeliveryAgency from "../../forms/delivery/edit_agency";
import DeliveryAgentPreview from "../../components/table/delivery-agencies/agents/preview";
import EditAgentForm from "../../forms/delivery/edit_agent";
import EditSupplierForm from "../../forms/stock/edit_supplier";
import EditStockForm from "../../forms/stock/edit_stock";
import EditBankInfo from "../../forms/bank/edit_bank";

const drawerWidth = 270;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: "white",
    color: "black",
    boxShadow: "none",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    backgroundColor: "primary.main",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentPadding: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 15,
    margin: "auto",
  },
}));

function Dashboard(props) {
  const { window } = props;
  const classes = useStyles();

  const { userData } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openSignoutBackDrop, setOpenSignoutBackDrop] = React.useState(false);
  const [content, setContent] = React.useState(null);
  const dispatch = useDispatch();

  const [anchorElMore, setAnchorElMore] = React.useState(null);
  const openMore = Boolean(anchorElMore);
  const handleClick = (event) => {
    setAnchorElMore(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElMore(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [anchorPopperEl, setAnchorPopperEl] = React.useState(null);
  // const [anchorPopperEl2, setAnchorPopperEl2] = React.useState(null);

  const handlePopperClick = (event) => {
    setAnchorPopperEl(anchorPopperEl ? null : event?.currentTarget);
  };

  // const handlePopperClick2 = (event) => {
  //   setAnchorPopperEl2(anchorPopperEl2 ? null : event?.currentTarget);
  // };

  const openPopper = Boolean(anchorPopperEl);
  const popperId = openPopper ? "simple-popper" : undefined;

  // const openPopper2 = Boolean(anchorPopperEl2);
  // const popperId2 = openPopper2 ? "simply-popper" : undefined;

  const handleBackdrop = (value) => {
    setOpenSignoutBackDrop(value);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    try {
      onSnapshot(doc(db, "cms", "privacy-policy"), (doc) => {
        dispatch(setPrivacyData(doc.data()));
      });

      onSnapshot(doc(db, "cms", "contact-us"), (doc) => {
        dispatch(setContactData(doc.data()));
      });

      onSnapshot(doc(db, "cms", "about"), (doc) => {
        dispatch(setAboutData(doc.data()));
      });

      onSnapshot(doc(db, "cms", "bank"), (doc) => {
        dispatch(setBankData(doc.data()));
      });

      const faqQuery = query(collection(db, "faqs"));
      onSnapshot(faqQuery, (querySnapshot) => {
        const faqs = [];
        querySnapshot.forEach((doc) => {
          faqs.push(doc.data());
        });
        dispatch(setFAQData(faqs));
      });

      const adsQuery = query(collection(db, "ads"));
      onSnapshot(adsQuery, (querySnapshot) => {
        const ads = [];
        querySnapshot.forEach((doc) => {
          ads.push(doc.data());
        });
        dispatch(setAdsData(ads));
      });

      const salesQuery = query(collection(db, "sales"));
      onSnapshot(salesQuery, (querySnapshot) => {
        const sales = [];
        querySnapshot.forEach((doc) => {
          sales.push(doc.data());
        });
        dispatch(setSalesData(sales));
      });

      const blogQuery = query(collection(db, "blog"));
      onSnapshot(blogQuery, (querySnapshot) => {
        const blog = [];
        querySnapshot.forEach((doc) => {
          blog.push(doc.data());
        });
        dispatch(setBlogData(blog));
      });

      const menuQuery = query(collection(db, "menus"));
      onSnapshot(menuQuery, (querySnapshot) => {
        const menus = [];
        querySnapshot.forEach((doc) => {
          menus.push(doc.data());
        });
        dispatch(setMenuData(menus));
      });

      const deliveryQuery = query(collection(db, "deliveries"));
      onSnapshot(deliveryQuery, (querySnapshot) => {
        const deliveries = [];
        querySnapshot.forEach((doc) => {
          deliveries.push(doc.data());
        });
        dispatch(setDeliveryData(deliveries));
      });

      const deliveryAgenciesQuery = query(collection(db, "delivery-agency"));
      onSnapshot(deliveryAgenciesQuery, (querySnapshot) => {
        const agencies = [];
        querySnapshot.forEach((doc) => {
          agencies.push(doc.data());
        });
        dispatch(setDeliveryAgenciesData(agencies));
      });

      const supportQuery = query(collection(db, "support"));
      onSnapshot(supportQuery, (querySnapshot) => {
        const support = [];
        querySnapshot.forEach((doc) => {
          support.push(doc.data());
        });
        dispatch(setSupportsData(support));
      });

      const ordersQuery = query(collection(db, "orders"));
      onSnapshot(ordersQuery, (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push(doc.data());
        });
        dispatch(setOrdersData(orders));
      });

      const productsQuery = query(collection(db, "products"), orderBy("name"));
      onSnapshot(productsQuery, (querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
        });
        dispatch(setProductsData(products));
      });

      const posTransQuery = query(collection(db, "pos_transactions"));
      onSnapshot(posTransQuery, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch(setPOSTransData(data));
      });

      const suppliersQuery = query(collection(db, "suppliers"));
      onSnapshot(suppliersQuery, (querySnapshot) => {
        const suppliers = [];
        querySnapshot.forEach((doc) => {
          suppliers.push(doc.data());
        });
        dispatch(setSuppliersData(suppliers));
      });

      const stocksQuery = query(
        collection(db, "stocks"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(stocksQuery, (querySnapshot) => {
        const stocks = [];
        querySnapshot.forEach((doc) => {
          stocks.push(doc.data());
        });
        dispatch(setStocksData(stocks));
      });

      const proofsQuery = query(collection(db, "proofs"));
      onSnapshot(proofsQuery, (querySnapshot) => {
        const proofs = [];
        querySnapshot.forEach((doc) => {
          proofs.push(doc.data());
        });
        dispatch(setProofsData(proofs));
      });
    } catch (err) {
      // console.log(err);
    }
  }, [dispatch]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  const initials =
    userData?.firstname?.slice(0, 1).toUpperCase() +
    userData?.lastname?.slice(0, 1).toUpperCase();

  let fullname = userData?.firstname + " " + userData?.lastname;

  React.useLayoutEffect(() => {
    if (userData) {
      if (
        userData?.userType !== "POS Agent" &&
        userData?.userType !== "Delivery Agent"
      ) {
        setContent(
          <div className={classes.root}>
            <Backdrop style={{ zIndex: 5000 }} open={openSignoutBackDrop}>
              <CircularProgress
                size={90}
                thickness={3.0}
                style={{ color: "white" }}
              />
            </Backdrop>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    paddingX={2}
                    fontWeight="600"
                    color={"primary.main"}
                  >
                    {userData?.userType}
                  </Typography>
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  {1 > 2 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        style={{ margin: "auto", paddingRight: 3 }}
                      >
                        Admin
                      </Typography>
                    </div>
                  )}
                  <Box
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="end"
                    alignItems="center"
                  >
                    <Typography pr={1}>
                      {fullname?.length > 16
                        ? fullname?.slice(0, 12) + "..."
                        : fullname}
                    </Typography>
                    <Avatar
                      src={userData?.image !== "" ? userData?.image : ""}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 32 / 2,
                        fontSize: 36,
                      }}
                    >
                      {userData?.image !== "" ? "" : initials}
                    </Avatar>
                  </Box>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer1
                  setMobileOpen={setMobileOpen}
                  mobileOpen={mobileOpen}
                  handleBackdrop={handleBackdrop}
                  drawerVariant="temporary"
                  anchor="left"
                  handleDrawerToggle={handleDrawerToggle}
                  window={window}
                />
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer2 handleBackdrop={handleBackdrop} />
              </Hidden>
            </nav>

            <main className={classes.content}>
              <div className={classes.toolbar} />
              {/* Main switch routing here */}
              <div className={classes.contentPadding}>
                <Switch>
                  <Redirect
                    exact
                    from="/dashboard/easyfit"
                    to="/dashboard/easyfit/home"
                  />
                  <Route path="/dashboard/easyfit/home" exact={true}>
                    <HomePage />
                  </Route>
                  <Route path="/dashboard/easyfit/products" exact={true}>
                    <Products />
                  </Route>
                  <Route path="/dashboard/easyfit/products/create" exact={true}>
                    <AddProductForm />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/products/:id/edit"
                    exact={true}
                  >
                    <EditProductForm />
                  </Route>

                  <Route
                    path="/dashboard/easyfit/products/bulk-upload"
                    exact={true}
                  >
                    <BulkUpload />
                  </Route>

                  <Route path="/dashboard/easyfit/orders" exact={true}>
                    <Orders />
                  </Route>
                  <Route path="/dashboard/easyfit/orders/:id" exact={true}>
                    <OrdersPreview />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/orders/:id/shipping"
                    exact={true}
                  >
                    <OrderShipping />
                  </Route>

                  <Route path="/dashboard/easyfit/payment-proofs" exact={true}>
                    <PaymentProofs />
                  </Route>
                  <Route path="/dashboard/easyfit/sales" exact={true}>
                    <Sales />
                  </Route>
                  <Route path="/dashboard/easyfit/deliveries" exact={true}>
                    <Delivery />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/delivery-agencies"
                    exact={true}
                  >
                    <DeliveryAgencies />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/delivery-agencies/:id"
                    exact={true}
                  >
                    <DeliveryAgencyPreview />
                  </Route>

                  <Route
                    path="/dashboard/easyfit/delivery-agencies/:id/agents/:ke"
                    exact={true}
                  >
                    <DeliveryAgentPreview />
                  </Route>

                  <Route
                    path="/dashboard/easyfit/deliveries-agencies/create"
                    exact={true}
                  >
                    <AddDeliveryAgency />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/delivery-agencies/:id/edit"
                    exact={true}
                  >
                    <EditDeliveryAgency />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/deliveries-agencies/:id/agents/create"
                    exact={true}
                  >
                    <AddAgentForm />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/deliveries-agencies/:id/agents/:ke/edit"
                    exact={true}
                  >
                    <EditAgentForm />
                  </Route>

                  <Route path="/dashboard/easyfit/menu" exact={true}>
                    <Category />
                  </Route>
                  <Route path="/dashboard/easyfit/support" exact={true}>
                    <Support />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/faq" exact={true}>
                    <FAQs />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/ads" exact={true}>
                    <AdsManager />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/ads/create" exact={true}>
                    <CreateAdsForm />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/ads/update" exact={true}>
                    <UpdateAdsForm />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/cms/privacy-policy"
                    exact={true}
                  >
                    <PrivacyPolicy />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/contact-us" exact={true}>
                    <ContactUs />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/cms/contact-us/update"
                    exact={true}
                  >
                    <ContactUsForm />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/cms/contact-us/about/update"
                    exact={true}
                  >
                    <UpdateAboutForm />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/cms/privacy-policy/update"
                    exact={true}
                  >
                    <UpdatePolicyForm />
                  </Route>
                  <Route path="/dashboard/easyfit/users/" exact={true}>
                    <Users />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/users/create-admin"
                    exact={true}
                  >
                    <CreateAdminForm />
                  </Route>
                  <Route path="/dashboard/easyfit/profile" exact={true}>
                    <Profile />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/bank" exact={true}>
                    <Bank />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/bank/update">
                    <EditBankInfo />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/blog" exact={true}>
                    <Blog />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/blog/create" exact={true}>
                    <AddBlog />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/blog/update" exact={true}>
                    <UpdateBlog />
                  </Route>
                  <Route path="/dashboard/easyfit/cms/blog:id" exact={true}>
                    <BlogDetail />
                  </Route>
                  <Route path="/dashboard/easyfit/stocks" exact={true}>
                    <Stock />
                  </Route>
                  <Route path="/dashboard/easyfit/stocks/create" exact={true}>
                    <AddStockForm />
                  </Route>
                  <Route path="/dashboard/easyfit/stocks/:id/edit" exact={true}>
                    <EditStockForm />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/stocks/suppliers"
                    exact={true}
                  >
                    <Suppliers />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/stocks/suppliers/create"
                    exact={true}
                  >
                    <AddSupplier />
                  </Route>
                  <Route
                    path="/dashboard/easyfit/stocks/suppliers/:id/edit"
                    exact={true}
                  >
                    <EditSupplierForm />
                  </Route>
                </Switch>
              </div>
            </main>
          </div>
        );
      } else if (userData?.userType === "Delivery Agent") {
        setContent(
          <div>
            <Backdrop style={{ zIndex: 5000 }} open={openSignoutBackDrop}>
              <CircularProgress
                size={90}
                thickness={3.0}
                style={{ color: "white" }}
              />
            </Backdrop>
            <DeliveryDashboard
              window={window}
              handleBackdrop={handleBackdrop}
            />
          </div>
        );
      } else {
        setContent(
          <div>
            <Backdrop style={{ zIndex: 5000 }} open={openSignoutBackDrop}>
              <CircularProgress
                size={90}
                thickness={3.0}
                style={{ color: "white" }}
              />
            </Backdrop>
            <AppBar color="inherit">
              <Toolbar>
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    color="primary.main"
                    fontWeight="700"
                    fontSize={24}
                  >
                    {userData?.userType}
                  </Typography>
                  <Box>
                    <ClockWrapper />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="end"
                    alignItems="center"
                  >
                    <IconButton
                      aria-describedby={popperId}
                      onClick={handlePopperClick}
                    >
                      <Calculate color="primary" fontSize="large" />
                    </IconButton>
                    <Popper
                      id={popperId}
                      open={openPopper}
                      anchorEl={anchorPopperEl}
                    >
                      <Box sx={{ p: 0 }}>
                        <CalculatorWrapper
                          setAnchorPopperEl={setAnchorPopperEl}
                        />
                      </Box>
                    </Popper>

                    <IconButton>
                      <Avatar
                        src={userData?.image !== "" ? userData?.image : ""}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 32 / 2,
                          fontSize: 36,
                        }}
                      >
                        {userData?.image !== "" ? "" : initials}
                      </Avatar>
                    </IconButton>

                    <IconButton
                      id="basic-button"
                      aria-controls={openMore ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMore ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MoreVertRounded />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorElMore}
                      open={openMore}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <AccountWrapper handleBackdrop={handleBackdrop} />
                    </Menu>
                  </Box>
                </Box>
              </Toolbar>
            </AppBar>
            <Toolbar />
            <Box
              display={"block"}
              position="absolute"
              top={80}
              left={1}
              right={1}
              bottom={1}
            >
              <SalesDashboard />
            </Box>
          </div>
        );
      }
    }
  }, [anchorPopperEl, anchorElMore]);

  return content;
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default withRouter(Dashboard);
