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
import { useSelector } from "react-redux";
import ActionButton from "./action_button";
import NumberFormat from "react-number-format";
import { TextField } from "@mui/material";

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

export default function OrdersTable() {
  const columns = [
    {
      field: "orderNo",
      headerName: "ORDER NO:",
      width: 105,
    },
    {
      field: "createdAt",
      headerName: "ORDERED ON",
      width: 160,
      valueGetter: (params) =>
        `${new Date(params.row?.createdAt?.seconds * 1000).toLocaleString(
          "en-US"
        )}`,
    },
    {
      field: "customerName",
      headerName: "ORDERED BY",
      width: 146,
      minWidth: 146,
    },
    {
      field: "items",
      headerName: "ITEMS",
      width: 68,
      valueGetter: (params) => `${params.row?.items?.length}`,
    },
    {
      field: "deliveryType",
      headerName: "DELIVERY",
      width: 95,
    },
    {
      field: "deliveryFee",
      headerName: "DELIVERY FEE",
      width: 120,
      renderCell: (params) => {
        return (
          <NumberFormat
            customInput={TextField}
            value={params?.row?.deliveryFee}
            thousandSeparator={true}
            prefix={"₦"}
            fullWidth
            size="small"
            disabled={true}
            variant="filled"
          />
        );
      },
    },
    {
      field: "paymentMethod",
      headerName: "PAYMENT",
      width: 92,
      valueGetter: (params) => `${params.row?.paymentMethod}`.toUpperCase(),
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 90,
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 130,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { ordersData } = useSelector((state) => state.orders);

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={ordersData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
