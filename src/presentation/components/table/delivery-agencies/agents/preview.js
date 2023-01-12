import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Toolbar } from "@mui/material";
import Edit from "@mui/icons-material/Edit";

const DeliveryAgentPreview = () => {
  const location = useLocation();
  const history = useHistory();
  let { item, agencyId } = location.state;

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
          <Typography
            px={2}
            textTransform="uppercase"
            variant="h"
            color="primary.main"
            fontWeight={"600"}
          >
            {`${item?.firstname} ${item?.lastname}`}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() =>
            history.push({
              pathname:
                "/dashboard/dwec/deliveries-agencies/:" +
                agencyId +
                "/agents/:" +
                item?.id +
                "/edit",
              state: {
                item: item,
                agencyId: agencyId,
              },
            })
          }
        >
          Edit Agent
        </Button>
      </Box>
      <Toolbar />
      <Box
        p={2}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="stretch"
        alignItems="center"
      >
        <img
          src={item?.image}
          alt=""
          width={100}
          height={100}
          style={{ borderRadius: 50 }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
            <Typography color="primary.main" fontWeight={"600"} pr={2}>
              BVN/NIN
            </Typography>
            <Typography>{item?.idcode}</Typography>
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
            <Typography color="primary.main" fontWeight={"600"} pr={2}>
              GENDER
            </Typography>
            <Typography>{item?.gender}</Typography>
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
              ADDRESS
            </Typography>
            <Typography>{`${item?.address}`}</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAgentPreview;
