import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./presentation/screens/login";
import Signup from "./presentation/screens/register";
import Dashboard from "./presentation/screens/dashboard";
import {
  PrivateRouteDashboard,
  PrivateRouteLogin,
  PrivateRouteSignup,
} from "./domain/helper/private-routes";
import React from "react";
import {
  auth,
  collection,
  query,
  onSnapshot,
  doc,
  db,
  orderBy,
} from "./data/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "./data/store/slice/user";
import {
  setAdsData,
  setBlogData,
  setFAQData,
  setContactData,
  setPrivacyData,
  setBankData,
  setAboutData,
} from "./data/store/slice/cms";
import { setMenuData } from "./data/store/slice/menu";
import {
  setDeliveryAgenciesData,
  setDeliveryData,
} from "./data/store/slice/deliveries";
import { setSupportsData } from "./data/store/slice/support";
import { setOrdersData } from "./data/store/slice/orders";
import { setProductsData, setFeaturedMeal } from "./data/store/slice/products";

import NotFound from "./presentation/screens/notfound";
import { setSuppliersData } from "./data/store/slice/suppliers";
import { setStocksData } from "./data/store/slice/stocks";
import { setSalesData } from "./data/store/slice/sales";
import { setProofsData } from "./data/store/slice/proofs";
import { setPOSTransData } from "./data/store/slice/pos";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      const user = auth.currentUser;
      if (user) {
        onSnapshot(doc(db, "users", "" + user.uid), (doc) => {
          dispatch(setUserData(doc.data()));
          // console.log("USERDATA::", doc.data());
        });
      }

      onSnapshot(doc(db, "cms", "privacy-policy"), (doc) => {
        dispatch(setPrivacyData(doc.data()));
      });

      onSnapshot(doc(db, "cms", "contact-us"), (doc) => {
        dispatch(setContactData(doc.data()));
      });

      onSnapshot(doc(db, "cms", "bank"), (doc) => {
        dispatch(setBankData(doc.data()));
      });

      onSnapshot(doc(db, "cms", "about"), (doc) => {
        dispatch(setAboutData(doc.data()));
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

      const blogQuery = query(collection(db, "blog"));
      onSnapshot(blogQuery, (querySnapshot) => {
        const blog = [];
        querySnapshot.forEach((doc) => {
          blog.push(doc.data());
        });
        dispatch(setBlogData(blog));
      });

      const menuQuery = query(collection(db, "menus"), orderBy("orderNo"));
      onSnapshot(menuQuery, (querySnapshot) => {
        const menus = [];
        querySnapshot.forEach((doc) => {
          menus.push(doc.data());
        });
        dispatch(setMenuData(menus));
      });

      const deliveryQuery = query(collection(db, "delivery"));
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

      const salesQuery = query(collection(db, "sales"));
      onSnapshot(salesQuery, (querySnapshot) => {
        const sales = [];
        querySnapshot.forEach((doc) => {
          sales.push(doc.data());
        });
        dispatch(setSalesData(sales));
      });

      const posTransQuery = query(collection(db, "pos_transactions"));
      onSnapshot(posTransQuery, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch(setPOSTransData(data));
      });

      const productsQuery = query(collection(db, "products"), orderBy("name"));
      onSnapshot(productsQuery, (querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
        });
        dispatch(setProductsData(products));
      });

      onSnapshot(doc(db, "week_meal", "meal"), (doc) => {
        dispatch(setFeaturedMeal(doc.data()));
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

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route path="about" render={() => <Redirect to="about-us" />} /> */}
          {/* <Navigate to="/login" replace  /> */}
          {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
          <Redirect exact from="/" to="/login" />
          <PrivateRouteLogin path="/login" exact={true}>
            <Login />
          </PrivateRouteLogin>

          <PrivateRouteSignup exact={true} path="/signup">
            <Signup />
          </PrivateRouteSignup>

          <PrivateRouteDashboard path="/dashboard/easyfit">
            <Dashboard />
          </PrivateRouteDashboard>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
