import React from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import CustomDialog from "../../../../../components/dashboard/dialogs/custom-dialog";
import DeleteDialog from "../../../../../components/dashboard/dialogs/custom-dialog";
import EditNewsForm from "../../../../../forms/blog/update_news_form";
import { useSnackbar } from "notistack";
import {
  deleteDoc,
  deleteObject,
  ref,
  db,
  doc,
  storage,
} from "../../../../../../data/firebase";
import Delete from "@mui/icons-material/Delete";
import ReactQuill from "react-quill"; // ES6

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: "auto",
    minHeight: 256,
    minWidth: 320,
    alignItems: "center",
  },
  cardMedia: {
    height: 156,
    width: "100%",
  },
  subRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
  },
  lhsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  avatar: {
    height: 48,
    width: 48,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    padding: 4,
  },
  mb: {
    marginBottom: 10,
  },
}));

const BlogDetail = (props) => {
  const { history, location } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const deleteNews = () => {
    setOpenDelete(false);
    const fileRef = ref(storage, "blog/" + location?.state?.id);
    const fileRef2 = ref(storage, "blog/img_" + location?.state?.id);

    deleteObject(fileRef)
      .then(() => {
        deleteObject(fileRef2)
          .then(async () => {
            // Images deleted now delete from firestore,
            try {
              await deleteDoc(doc(db, "blog", "" + location?.state?.id));
              enqueueSnackbar(`Item deleted successfully`, {
                variant: "success",
              });
            } catch (error) {
              console.log("ERR: Del: ", error);
              enqueueSnackbar(`Item not deleted. Try again`, {
                variant: "error",
              });
            }
          })
          .catch((err) => {});
      })
      .catch((error) => {
        console.log("ErR: ", error);
      });
  };

  const deleteBody = (
    <div>
      <Typography variant="body2" gutterBottom>
        {`Are you sure you want to delete ${location?.state?.title} ?`}
      </Typography>
      <br />
      <div className={classes.subRow}>
        <Button
          size="small"
          variant="contained"
          style={{ marginRight: 4 }}
          onClick={() => setOpenDelete(false)}
        >
          Cancel
        </Button>

        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={deleteNews}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  let modules = {
    toolbar: null,
  };

  return (
    <>
      <CustomDialog
        open={open}
        title="Update Post"
        handleClose={() => setOpen(false)}
        bodyComponent={
          <EditNewsForm
            setOpen={setOpen}
            img={location?.state?.image}
            title={location?.state?.title}
            id={location?.state?.id}
            subTitle={location?.state?.subTitle}
            authorName={location?.state?.authorName}
            authorPhoto={location?.state?.authorPhoto}
            body={location?.state?.body}
            category={location?.state?.category}
            date={location?.state?.date}
          />
        }
      />
      <DeleteDialog
        open={openDelete}
        title="Delete News"
        handleClose={() => setOpenDelete(false)}
        bodyComponent={deleteBody}
      />
      <div className={classes.row}>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        <div className={classes.lhsRow}>
          <Typography
            fontSize={21}
            variant="h6"
            textAlign="center"
            fontWeight="bold"
          >
            {location?.state?.title}
          </Typography>
        </div>

        <div className={classes.lhsRow}>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => setOpenDelete(true)}
          >
            <Delete />
          </IconButton>
        </div>
      </div>
      <br />
      {/* Image Section */}
      <div>
        <img
          src={location?.state?.image}
          alt="featured_image"
          width="100%"
          height={400}
        />
      </div>
      <br />

      <Typography fontSize={16} variant="h6" textAlign="start" gutterBottom>
        {location?.state?.category}
      </Typography>
      <Typography fontSize={18} variant="h6" textAlign="start">
        {location?.state?.subTitle}
      </Typography>
      <br />

      <div className={classes.lhsRow}>
        <ReactQuill
          value={location?.state?.body}
          readOnly={true}
          modules={modules}
          style={{ border: "none" }}
        />
      </div>
      <br />

      <div>
        <Typography
          fontSize={21}
          fontWeight="bold"
          textAlign="start"
          gutterBottom
        >
          Author
        </Typography>
        <Avatar
          alt="Author"
          src={location?.state?.authorPhoto}
          className={classes.avatar}
        />
        <Typography
          fontSize={16}
          fontWeight="bold"
          textAlign="start"
          gutterBottom
        >
          {location?.state?.authorName}
        </Typography>
      </div>
    </>
  );
};

export default withRouter(BlogDetail);
