import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
// import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
// import { useHistory } from "react-router-dom";
import LoginForm from "../../forms/login";
import image from "../../../assets/images/ic_launcher.png";
import image2 from "../../../assets/images/sider.jpg";
import { useMediaQuery, useTheme } from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />

      <Grid item xs={12} sm={8} md={6} component="div">
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: "auto",
            height: "100%",
          }}
        >
          <img src={image} alt="" width={72} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm />
        </Box>
      </Grid>
      {!xs && (
        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          sx={{
            height: "100vh",
            backgroundColor: "primary.main",
          }}
        >
          <div
            style={{
              height: "100vh",
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                my: "auto",
                height: "100%",
              }}
            >
              <img src={image2} alt="img" width={"100%"} />
            </Box>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default Login;
