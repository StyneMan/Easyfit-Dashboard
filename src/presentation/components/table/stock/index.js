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

export default function StocksTable() {
  const columns = [
    {
      field: "supplier",
      headerName: "SUPPLIER",
      width: 165,
    },
    {
      field: "warehouse",
      headerName: "WAREHOUSE",
      width: 150,
    },
    {
      field: `${"productName" ?? "prodName"}`,
      headerName: "PRODUCT NAME",
      width: 145,
    },
    {
      field: "product",
      headerName: "PRODUCT ID",
      width: 150,
    },
    {
      field: "unitPrice",
      headerName: "PURCHASE PRICE",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "QUANTITY",
      width: 100,
    },
    {
      field: "cost",
      headerName: "TOTAL COST",
      width: 128,
    },
    {
      field: "createdAt",
      headerName: "DATE",
      width: 100,
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
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { stocksData } = useSelector((state) => state.stocks);

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={stocksData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
