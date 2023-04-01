import { Update } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/system/Box";
import { useHistory } from "react-router-dom";
import { Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import CustomDialog from "../../../../components/dashboard/dialogs/custom-dialog";
import UpdateFeaturedMealForm from "../../../../forms/products/update_featured_meal";

const WeekMeal = () => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  let { featuredMealData } = useSelector((state) => state.products);

  return (
    <div>
      <CustomDialog
        title="Update Meal of the week"
        open={open}
        handleClose={() => setOpen(false)}
        bodyComponent={
          <UpdateFeaturedMealForm
            item={featuredMealData}
            amnt={featuredMealData?.price}
            img={featuredMealData?.image}
          />
        }
      />
      <Box
        paddingBottom={4}
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          textTransform={"uppercase"}
          variant="h4"
          fontWeight={"700"}
          color="primary.main"
        >
          Meal Of The Week
        </Typography>
        <Button
          startIcon={<Update />}
          variant="contained"
          onClick={() => history.push("/dashboard/easyfit/products/create")}
        >
          Update
        </Button>
      </Box>
      <Toolbar />
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"stretch"}
        alignItems={"start"}
      >
        {featuredMealData && (
          <>
            <img src={featuredMealData?.image} alt="" width="50%" />
            <br />
            <Typography
              gutterBottom
            >{`Menu: ${featuredMealData?.menu}`}</Typography>
            <Typography
              gutterBottom
            >{`Name: ${featuredMealData?.name}`}</Typography>
          </>
        )}
      </Box>
    </div>
  );
};

export default WeekMeal;
