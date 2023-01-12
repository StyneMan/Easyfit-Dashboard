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

export default function SupportsTable() {
  const columns = [
    {
      field: "ticketNo",
      headerName: "ID:",
      width: 105,
    },
    {
      field: "name",
      headerName: "NAME",
      width: 160,
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 136,
    },
    {
      field: "phone",
      headerName: "PHONE",
      width: 120,
    },
    {
      field: "subject",
      headerName: "SUBJECT",
      width: 115,
    },
    {
      field: "message",
      headerName: "MESSAGE",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "CREATED ON",
      width: 115,
      valueGetter: (params) =>
        `${new Date(params.row?.createdAt?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
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

  const { supportsData } = useSelector((state) => state.supports);

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={supportsData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
