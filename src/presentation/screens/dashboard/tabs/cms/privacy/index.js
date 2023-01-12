import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
// import image from "../../../../../../assets/images/privacy.jpeg";
import Grid from "@mui/material/Grid";
import CustomDialog from "../../../../../components/dashboard/dialogs/custom-dialog";
import UpdatePolicyForm from "../../../../../forms/privacy-policy/update_policy_form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";

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
}));

const PrivacyPolicy = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const { privacyData } = useSelector((state) => state.cms);

  let modules = {
    toolbar: null,
  };

  return (
    <div>
      <CustomDialog
        title="Update Privacy Policy"
        open={open}
        handleClose={() => setOpen(false)}
        bodyComponent={
          <UpdatePolicyForm setOpen={setOpen} body={privacyData?.body} />
        }
      />
      <div className={classes.row}>
        <Typography variant="h4" color="primary.main" fontWeight="700">
          Privacy Policy
        </Typography>
        <Button
          startIcon={<Edit />}
          variant="contained"
          onClick={() =>
            history.push({
              pathname: "/dashboard/dwec/cms/privacy-policy/update",
              state: {
                body: privacyData?.body,
              },
            })
          }
        >
          Edit
        </Button>
      </div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          {privacyData && (
            <>
              <Typography gutterBottom align="left" fontSize={13}>
                Last updated on{" "}
                {`${new Date(
                  privacyData?.updatedAt?.seconds * 1000
                ).toLocaleDateString("en-US")}`}
              </Typography>

              <ReactQuill
                value={privacyData?.body}
                readOnly={true}
                modules={modules}
              />

              {/* <Typography align="justify">{privacyData?.body}</Typography> */}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PrivacyPolicy;
