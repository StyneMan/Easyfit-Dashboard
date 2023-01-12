import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  AccountBalance,
  Edit,
  LocationOn,
  Numbers,
  Person,
  Web,
} from "@mui/icons-material";
import image from "../../../../../../assets/images/bank.png";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
  },
  header: {
    height: 286,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowStart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
}));

const Bank = () => {
  const classes = useStyles();
  const history = useHistory();

  const { bankData } = useSelector((state) => state.cms);

  return (
    <div>
      <div className={classes.row}>
        <Typography
          textTransform="uppercase"
          variant="h4"
          color="primary.main"
          fontWeight="700"
        >
          Bank Account Information
        </Typography>
        <Button
          startIcon={<Edit />}
          variant="contained"
          onClick={() =>
            history.push({
              pathname: "/dashboard/dwec/cms/bank/update",
              state: {
                bankName1: bankData?.bankName1,
                bankBranch1: bankData?.bankBranch1,
                accountName1: bankData?.accountName1,
                accountNumber1: bankData?.accountNumber1,
                bankName2: bankData?.bankName2,
                bankBranch2: bankData?.bankBranch2,
                accountName2: bankData?.accountName2,
                accountNumber2: bankData?.accountNumber2,
              },
            })
          }
        >
          Edit
        </Button>
      </div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={5}>
          <Box paddingY={2}>
            {bankData && (
              <>
                <br />
                <div className={classes.rowStart}>
                  <AccountBalance fontSize="medium" color="primary" />
                  <Typography sx={{ ml: 2 }} gutterBottom>
                    {bankData?.bankName1}
                  </Typography>
                </div>

                <div className={classes.rowStart}>
                  <LocationOn fontSize="medium" color="primary" />
                  <Typography sx={{ ml: 2 }} gutterBottom>
                    {bankData?.bankBranch1}
                  </Typography>
                </div>

                <div className={classes.rowStart}>
                  <Web fontSize="medium" color="primary" />
                  <Typography sx={{ ml: 2 }} gutterBottom align="justify">
                    {bankData?.accountName1}
                  </Typography>
                </div>

                <div className={classes.rowStart}>
                  <Numbers fontSize="medium" color="primary" />
                  <Typography sx={{ ml: 2 }} gutterBottom align="justify">
                    {bankData?.accountNumber1}
                  </Typography>
                </div>
              </>
            )}
          </Box>
          <Divider />
          <Box paddingY={1}>
            {bankData && (
              <>
                <br />
                <div className={classes.rowStart}>
                  <AccountBalance fontSize="medium" color="primary" />
                  <Typography sx={{ ml: 2 }} gutterBottom>
                    {bankData?.bankName2}
                  </Typography>
                </div>

                <div className={classes.rowStart}>
                  <LocationOn fontSize="medium" color="primary" />
                  <Typography sx={{ ml: 2 }} gutterBottom>
                    {bankData?.bankBranch2}
                  </Typography>
                </div>

                <div className={classes.rowStart}>
                  <Person fontSize="medium" color="primary" />
                  <Typography sx={{ ml: 2 }} gutterBottom align="justify">
                    {bankData?.accountName2}
                  </Typography>
                </div>

                <div className={classes.rowStart}>
                  <Numbers fontSize="medium" color="primary" />
                  <Typography sx={{ ml: 2 }} gutterBottom align="justify">
                    {bankData?.accountNumber2}
                  </Typography>
                </div>
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={7}>
          <div>
            <img src={image} alt="featured-img" width="64%" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Bank;
