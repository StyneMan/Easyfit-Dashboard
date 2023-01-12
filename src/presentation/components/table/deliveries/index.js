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
import { Typography } from "@mui/material";

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

export default function DeliveriesTable() {
  const columns = [
    {
      field: "orderNo",
      headerName: "ORDER NO:",
      width: 100,
      valueGetter: (params) => `${params?.row?.order?.orderNo}`,
    },
    {
      field: "createdAt",
      headerName: "ORDER DATE",
      width: 110,
      valueGetter: (params) =>
        `${new Date(
          params.row?.order?.createdAt?.seconds * 1000
        ).toLocaleDateString("en-US")}`,
    },
    {
      field: "customerName",
      headerName: "CUSTOMER",
      width: 128,
      renderCell: (params) => {
        return (
          <Typography fontSize={13}>
            {params?.row?.order?.customerName}
          </Typography>
        );
      },
    },
    {
      field: "address",
      headerName: "DELIVERY ADDRESS",
      width: 192,
      renderCell: (params) => {
        return (
          <Typography fontSize={13}>
            {params?.row?.order?.deliveryInfo?.address}
          </Typography>
        );
      },
    },
    {
      field: "agentName",
      headerName: "DELIVERY AGENT",
      width: 144,
      renderCell: (params) => {
        return (
          <Typography
            fontSize={13}
          >{`${params?.row?.agent?.firstname} ${params?.row?.agent?.lastname}`}</Typography>
        );
      },
    },
    {
      field: "agentPhone",
      headerName: "PHONE",
      width: 118,
      valueGetter: (params) => `${params?.row?.agent?.phone}`,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 84,
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { deliveryData } = useSelector((state) => state.delivery);

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={deliveryData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
