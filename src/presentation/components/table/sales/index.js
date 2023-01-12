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

export default function SalesTable() {
  const columns = [
    {
      field: "rep",
      headerName: "SALES REP",
      width: 165,
    },
    {
      field: "soldOn",
      headerName: "SOLD ON",
      width: 90,
      valueGetter: (params) =>
        `${new Date(params.row?.soldOn?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
    },
    {
      field: "product",
      headerName: "PRODUCT ID",
      width: 120,
    },
    {
      field: "name",
      headerName: "ITEM NAME",
      width: 130,
    },
    {
      field: "image",
      headerName: "Image".toUpperCase(),
      width: 70,
      renderCell: (params) => (
        <img alt="Profile" src={params?.row?.image} width="56%" />
      ),
    },
    {
      field: "price",
      headerName: "PRICE",
      width: 70,
    },
    {
      field: "quantity",
      headerName: "QUANTITY",
      width: 75,
    },
    {
      field: "cost",
      headerName: "COST",
      width: 70,
      valueGetter: (params) => `${params?.row?.price * params?.row?.quantity}`,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 85,
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

  const { salesData } = useSelector((state) => state.sales);

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={salesData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
