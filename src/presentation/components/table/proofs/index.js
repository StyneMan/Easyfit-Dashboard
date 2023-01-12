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

export default function ProofsTable() {
  const columns = [
    {
      field: "orderNo",
      headerName: "ORDER NO:",
      width: 135,
    },
    {
      field: "createdAt",
      headerName: "DATE",
      width: 125,
      valueGetter: (params) =>
        `${new Date(params.row?.createdAt?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
    },
    {
      field: "name",
      headerName: "CUSTOMER NAME",
      width: 215,
    },
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params) => (
        <img alt="Profile" src={params?.row?.image} width="56%" />
      ),
    },
    {
      field: "amount",
      headerName: "AMOUNT",
      width: 125,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 125,
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

  const { proofsData } = useSelector((state) => state.proofs);

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={proofsData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
