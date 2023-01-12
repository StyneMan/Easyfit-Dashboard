import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import DeleteDialog from "../../../../../components/dashboard/dialogs/custom-dialog";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import {
  db,
  doc,
  ref,
  deleteObject,
  storage,
  deleteDoc,
} from "../../../../../../data/firebase";
import { useSnackbar } from "notistack";

import Avatar from "@mui/material/Avatar";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: "auto",
    minHeight: 275,
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
    height: 36,
    width: 36,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    padding: 4,
  },
}));

const ItemCard = (props) => {
  const { image, title, id, authorName, authorPhoto, date, category, item } =
    props;
  const classes = useStyles();
  const [openDelete, setOpenDelete] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const deleteNews = () => {
    setOpenDelete(false);
    const fileRef = ref(storage, "news/" + id);
    const fileRef2 = ref(storage, "news/img_" + id);

    deleteObject(fileRef)
      .then(() => {
        deleteObject(fileRef2)
          .then(async () => {
            // Images deleted now delete from firestore,
            try {
              await deleteDoc(doc(db, "news", "" + id));
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
        {`Are you sure you want to delete ${title} ?`}
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

  return (
    <>
      <DeleteDialog
        open={openDelete}
        title="Delete News"
        handleClose={() => setOpenDelete(false)}
        bodyComponent={deleteBody}
      />
      <Card elevation={3} className={classes.root}>
        <div className={classes.rowHeader}>
          <div className={classes.lhsRow}>
            <Avatar
              alt="Passport"
              src={authorPhoto}
              className={classes.avatar}
            />
            <div className={classes.column}>
              <Typography variant="body2" fontSize={14}>
                {authorName}
              </Typography>
              <Typography variant="body2" fontSize={13}>
                {date}
              </Typography>
            </div>
          </div>
          <div className={classes.subRow}>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                history.push({
                  pathname: "/dashboard/dwec/cms/blog/update",
                  state: {
                    id: item?.id,
                    title: item?.title,
                    img: item?.image,
                    category: item?.category,
                    body: item?.body,
                    summary: item?.summary,
                    authorName: item?.authorName,
                    authorPhoto: item?.authorPhoto,
                  },
                })
              }
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => setOpenDelete(true)}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
        <CardActionArea
          onClick={() =>
            history.push({
              pathname: "/dashboard/dwec/cms/blog:" + item?.id,
              state: {
                title: item?.title,
                category: item?.category,
                image: item?.image,
                body: item?.body,
                authorName: item?.authorName,
                authorPhoto: item?.authorPhoto,
                date: item?.createdAt,
                id: item?.id,
              },
            })
          }
        >
          <CardMedia image={image} className={classes.cardMedia} />
          <Divider />
          <div className={classes.row}>
            <Typography
              fontSize={16}
              color="black"
              paddingLeft={1}
              textAlign="start"
              fontWeight="bold"
            >
              {title?.length > 75 ? title?.substring(0, 75) + "..." : title}
            </Typography>
          </div>
          <Typography
            justifyContent="stretch"
            textAlign="left"
            gutterBottom
            fontSize={12}
            color="black"
            paddingLeft={1}
            paddingBottom={1}
          >
            {category}
          </Typography>
        </CardActionArea>
      </Card>
    </>
  );
};

const Blog = () => {
  const classes = useStyles();
  const history = useHistory();

  const { blogData } = useSelector((state) => state.cms);

  return (
    <div>
      <div className={classes.row}>
        <div className={classes.lhsRow}>
          <Typography
            textTransform={"uppercase"}
            variant="h6"
            fontWeight="700"
            color="primary.main"
          >
            Blog Posts
          </Typography>
        </div>
        <Button
          startIcon={<Add />}
          color="primary"
          variant="contained"
          onClick={() => history.push("/dashboard/dwec/cms/blog/create")}
        >
          New Post
        </Button>
      </div>
      <br />
      <div>
        {blogData && (
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {blogData?.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <ItemCard
                  item={item}
                  id={blogData[index]?.id}
                  image={blogData[index]?.image}
                  title={blogData[index]?.title}
                  authorName={blogData[index]?.authorName}
                  authorPhoto={blogData[index]?.authorPhoto}
                  category={blogData[index]?.category}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {blogData?.length < 1 && (
          <div className={classes.main}>
            <div style={{ marginTop: "auto" }}>
              <CloudOffIcon fontSize="large" />
              <Typography>No records found</Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
