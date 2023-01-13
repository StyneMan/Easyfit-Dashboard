import React from "react";
import Button from "@mui/material/Button";
import { signInUser } from "../../../domain/service";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { db, doc, onSnapshot, auth } from "../../../data/firebase";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import CircularProgress from "@mui/material/CircularProgress";
import { RefreshOutlined } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { setUserData } from "../../../data/store/slice/user";
import { useHistory } from "react-router-dom";
import { MenuItem } from "@mui/material";

const userTypes = ["Admin", "Manager", "POS Agent"];

const LoginForm = () => {
  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
    userType: "",
  });
  const [showCode, setShowCode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const filterResp = (value) => {
    let val = value?.substring(5, value?.length);
    let filtered = val.replace("-", " ");
    return filtered;
  };

  const submitForm = async (e) => {
    setIsLoading(true);

    try {
      let resp = await signInUser(formValues.email, formValues.password);
      setIsLoading(false);
      onSnapshot(doc(db, "users", resp.user.uid), async (doc) => {
        //Checkk the user type here before proceeding
        if (doc.data()?.userType === "Public") {
          await auth.signOut();
          dispatch(setUserData(null));
          enqueueSnackbar(`${"Check out our app or visit our website!"}`, {
            variant: "info",
          });
        } else if (doc.data()?.userType === "Delivery Agent") {
          await auth.signOut();
          dispatch(setUserData(null));
          enqueueSnackbar(`${"Use the delivery web app!"}`, {
            variant: "info",
          });
        } else {
          dispatch(setUserData(doc.data()));
          history.push("/dashboard/easyfit");
        }

        // console.log("DATA::", doc.data());
        // console.log("FIELD DATA::", doc.data()?.userType);
      });
    } catch (error) {
      setIsLoading(false);
      if (error?.code === "auth/network-request-failed") {
        enqueueSnackbar(`${"Check your internet connection!"}`, {
          variant: "error",
        });
      } else if (error?.code?.includes("wrong password")) {
        enqueueSnackbar(`${"Wrong credentials!"}`, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          `${filterResp(error?.code) || "Check your internet connection!"}`,
          {
            variant: "error",
          }
        );
      }
    }
  };

  return (
    <div>
      <ValidatorForm onSubmit={submitForm} sx={{ mt: 1 }}>
        <TextValidator
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="Email Address"
          variant="outlined"
          validators={["required"]}
          errorMessages={["Email address is required"]}
        />
        <TextValidator
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showCode ? "text" : "password"}
          id="password"
          onChange={handleChange}
          value={formValues.password}
          autoComplete="current-password"
          placeholder="Password"
          variant="outlined"
          validators={["required"]}
          errorMessages={["Password is required"]}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle code"
                  onClick={() => setShowCode(!showCode)}
                  onMouseDown={() => setShowCode(!showCode)}
                  edge="end"
                >
                  {showCode ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <SelectValidator
          margin="normal"
          value={formValues.userType}
          onChange={handleChange}
          label="Who are you?"
          name="userType"
          fullWidth
          variant="outlined"
          size="small"
          validators={["required"]}
          errorMessages={["User type is required"]}
        >
          {userTypes?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </SelectValidator>

        <Button
          disabled={isLoading}
          endIcon={
            isLoading && (
              <CircularProgress>
                <RefreshOutlined />
              </CircularProgress>
            )
          }
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <div>
          <div>Forgot password?</div>

          {/* <div>
            <Link variant="body2" onClick={() => history.push("/signup")}>
              {"Don't have an account? Sign Up"}
            </Link>
          </div> */}
        </div>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </ValidatorForm>
    </div>
  );
};

export default LoginForm;
