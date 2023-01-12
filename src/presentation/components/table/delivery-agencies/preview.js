import Add from "@mui/icons-material/Add";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Toolbar } from "@mui/material";
import DeliveryAgentsTable from "./agents";

const DeliveryAgencyPreview = () => {
  const location = useLocation();
  const history = useHistory();
  let { item } = location.state;

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIosNew />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="start"
          alignItems="center"
        >
          <img src={item?.image} alt="" width={48} />
          <Typography
            px={2}
            textTransform="uppercase"
            variant="h6"
            color="primary.main"
            fontWeight={"600"}
          >
            {item?.name}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() =>
            history.push({
              pathname:
                "/dashboard/dwec/deliveries-agencies/" +
                item?.id +
                "/agents/create",
              state: { item: item },
            })
          }
        >
          Add Agent
        </Button>
      </Box>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
            <Typography color="primary.main" fontWeight={"600"} pr={2}>
              COMPANY ADDRESS
            </Typography>
            <Typography>{item?.address}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
            <Typography color="primary.main" fontWeight={"600"} pr={2}>
              EMAIL ADDRESS
            </Typography>
            <Typography>{item?.email}</Typography>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
            <Typography color="primary.main" fontWeight={"600"} pr={2}>
              PHONE NUMBER
            </Typography>
            <Typography>{item?.phone}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
            <Typography color="primary.main" fontWeight={"600"} pr={2}>
              ADDED ON
            </Typography>
            <Typography>{`${new Date(
              item?.createdAt?.seconds * 1000
            ).toLocaleDateString("en-US")}`}</Typography>
          </Box>
        </Grid>
      </Grid>
      <br />
      <br />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        <Typography
          textTransform="uppercase"
          color="secondary.main"
          fontWeight={"600"}
          gutterBottom={true}
        >
          COMPANY'S DELIVERY AGENTS
        </Typography>
        <DeliveryAgentsTable items={item?.agents} agencyId={item?.id} />
      </Box>
    </div>
  );
};

export default DeliveryAgencyPreview;
