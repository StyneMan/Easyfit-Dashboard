import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../misc/placeholder/custom_no_data";
import ActionButton from "./action_button";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import getSymbolFromCurrency from "currency-symbol-map";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ProductsTable() {
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 140,
      valueGetter: (params) => `${params?.row?.id}`,
    },
    {
      field: "image",
      headerName: "IMAGE",
      minWidth: 80,
      renderCell: (params) => (
        <img alt="Profile" src={params?.row?.image} width="56%" />
      ),
    },
    {
      field: "name",
      headerName: "NAME",
      minWidth: 186,
    },
    {
      field: "category",
      headerName: "CATEGORY",
      minWidth: 144,
    },
    {
      field: "price",
      headerName: "PRICE",
      minWidth: 105,
      renderCell: (params) => (
        <Typography fontSize={14}>{`${getSymbolFromCurrency("NGN")} ${
          params?.row?.price
        }`}</Typography>
      ),
    },
    {
      field: "discountPrice",
      headerName: "SALE PRICE",
      minWidth: 105,
      renderCell: (params) => (
        <Typography fontSize={14}>{`${getSymbolFromCurrency("NGN")} ${
          params?.row?.discountPrice
        }`}</Typography>
      ),
    },
    {
      field: "discountType",
      headerName: "DISCOUNT TYPE",
      minWidth: 135,
      renderCell: (params) => (
        <Typography fontSize={14}>{`${params?.row?.discountType}`}</Typography>
      ),
    },
    {
      field: "discountPercent",
      headerName: "% DISCOUNT",
      minWidth: 110,
      renderCell: (params) => (
        <Typography fontSize={14}>{`-${
          params?.row?.discountPercent ?? "0"
        }%`}</Typography>
      ),
    },
    {
      field: "quantity",
      headerName: "STOCK",
      minWidth: 80,
    },
    {
      field: "id",
      headerName: "ACTIONS",
      minWidth: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { productsData } = useSelector((state) => state.products);

  return (
    <div style={{ height: 565, width: "100%" }}>
      <DataGrid
        rows={productsData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
