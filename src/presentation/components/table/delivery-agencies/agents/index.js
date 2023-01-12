import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../../misc/placeholder/custom_no_data";
import ActionButton from "./action_button";
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

export default function DeliveryAgentsTable(props) {
  let { items, agencyId } = props;

  const columns = [
    {
      field: "name",
      headerName: "AGENT'S NAME",
      width: 132,
      valueGetter: (params) => `${params.row.firstname} ${params.row.lastname}`,
    },
    {
      field: "image",
      headerName: "PHOTO",
      width: 75,
      renderCell: (params) => (
        <img alt="Profile" src={params?.row?.image} width="56%" />
      ),
    },
    {
      field: "email",
      headerName: "EMAIL ADDRESS",
      width: 140,
    },
    {
      field: "address",
      headerName: "ADDRESS",
      width: 175,
      renderCell: (params) => {
        return <Typography>{params?.row?.address}</Typography>;
      },
    },
    {
      field: "phone",
      headerName: "PHONE",
      width: 115,
    },
    {
      field: "idcode",
      headerName: "BVN/NIN",
      width: 100,
    },
    {
      field: "gender",
      headerName: "GENDER",
      width: 80,
    },
    {
      field: "createdAt",
      headerName: "ADDED ON",
      width: 94,
      valueGetter: (params) =>
        `${new Date(params.row?.createdAt?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} agencyId={agencyId} />;
      },
    },
  ];

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
