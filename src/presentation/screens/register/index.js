import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import SignupForm from "../../forms/register";
import pattern from "../../../assets/images/pattern.svg";
import logo from "../../../assets/images/splash_logo.png";

const Signup = () => {
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
      <Grid
        item
        xs={false}
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
            backgroundImage: "url(" + pattern + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1000,
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
            <img src={logo} alt="img" width={156} />
          </Box>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: "auto",
            height: "100%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <SignupForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
