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
import { Avatar } from "@mui/material";

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

export default function SuppliersTable() {
  const columns = [
    {
      field: "image",
      headerName: "Logo",
      width: 75,
      renderCell: (params) => <Avatar alt="Profile" src={params?.row?.image} />,
    },
    {
      field: "name",
      headerName: "SUPPLIER NAME",
      width: 200,
    },
    {
      field: "email",
      headerName: "EMAIL ADDRESS",
      width: 175,
    },
    {
      field: "phone",
      headerName: "PHONE NUMBER",
      width: 135,
    },
    {
      field: "address",
      headerName: "ADDRESS",
      width: 225,
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

  const { suppliersData } = useSelector((state) => state.suppliers);

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={suppliersData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
