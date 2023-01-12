import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../misc/placeholder/custom_no_data";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  db,
  arrayRemove,
  doc,
  updateDoc,
  arrayUnion,
} from "../../../../data/firebase";
import { Box } from "@mui/system";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {
  setInitValue,
  setTriggerPOS,
} from "../../../../data/store/slice/sales";

// const useStyles = makeStyles(() => ({
//   noBorder: {
//     border: "none",
//   },
// }));

export default function POSTable() {
  // const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const removeItem = async (item) => {
    try {
      const usersRef = doc(db, "users", `${userData?.id}`);
      await updateDoc(usersRef, {
        sales: arrayRemove(item),
      });
    } catch (e) {}
  };

  const increaseQuantity = async (item) => {
    removeItem(item);
    const usersRef = doc(db, "users", `${userData?.id}`);
    let unitPrice = item?.price;
    let prevQuantity = item?.quantity;
    let increment = prevQuantity + 1;
    const all = {
      ...item,
      quantity: increment,
      cost: unitPrice * increment,
    };

    try {
      await updateDoc(usersRef, {
        sales: arrayUnion(all),
      });
      dispatch(setInitValue(0));
      dispatch(setTriggerPOS("increase"));
      setTimeout(() => {
        dispatch(setTriggerPOS(null));
      }, 3000);
    } catch (err) {}
  };

  const decreaseQuantity = async (item) => {
    const usersRef = doc(db, "users", `${userData?.id}`);
    if (item?.quantity === 1) return;
    if (item?.quantity >= 1) {
      removeItem(item);

      // console.log("ASW:::", item);
      let unitPrice = item?.price;
      let prevQuantity = item?.quantity;
      let increment = prevQuantity - 1;
      const all = {
        ...item,
        quantity: increment,
        cost: unitPrice * increment,
      };

      try {
        await updateDoc(usersRef, {
          sales: arrayUnion(all),
        });
        dispatch(setInitValue(0));
        dispatch(setTriggerPOS("decrease"));
        setTimeout(() => {
          dispatch(setTriggerPOS(null));
        }, 3000);
      } catch (err) {}
    }
  };

  const handleDelete = async (item) => {
    try {
      const usersRef = doc(db, "users", `${userData?.id}`);
      await updateDoc(usersRef, {
        sales: arrayRemove(item),
      });
      dispatch(setInitValue(0));
      dispatch(setTriggerPOS("product"));
      setTimeout(() => {
        dispatch(setTriggerPOS(null));
      }, 3000);
      enqueueSnackbar(`${"Item deleted successfully."}`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        `${error?.message || "Check your internet connection!"}`,
        {
          variant: "error",
        }
      );
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      width: 110,
    },
    {
      field: "price",
      headerName: "PRICE",
      width: 80,
    },
    {
      field: "quantity",
      headerName: "QUANTITY",
      width: 100,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{params?.row?.quantity}</Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="start"
              alignItems="center"
            >
              <IconButton
                onClick={() => increaseQuantity(params?.row)}
                size="small"
                sx={{ width: 28, height: 28 }}
              >
                <ArrowDropUp />
              </IconButton>

              <IconButton
                onClick={() => decreaseQuantity(params?.row)}
                size="small"
                sx={{ width: 28, height: 28 }}
              >
                <ArrowDropDown />
              </IconButton>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "cost",
      headerName: "SUBTOTAL",
      width: 100,
    },
    {
      field: "id",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => handleDelete(params?.row)}>
            <DeleteOutlineOutlined />
          </IconButton>
        );
      },
    },
  ];

  const { userData } = useSelector((state) => state.user);

  return (
    <div style={{ height: 465, width: "100%" }}>
      <DataGrid
        rows={userData?.sales}
        columns={columns}
        pagination={false}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
