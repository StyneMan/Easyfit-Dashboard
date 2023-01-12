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

export default function DeliveryAgenciesTable() {
  const columns = [
    {
      field: "name",
      headerName: "COMPANY NAME",
      width: 150,
    },
    {
      field: "image",
      headerName: "BRAND",
      width: 75,
      renderCell: (params) => (
        <img alt="Profile" src={params?.row?.image} width="56%" />
      ),
    },
    {
      field: "email",
      headerName: "EMAIL ADDRESS",
      width: 165,
    },
    {
      field: "address",
      headerName: "COMPANY ADDRESS",
      width: 220,
      renderCell: (params) => {
        return <Typography>{params?.row?.address}</Typography>;
      },
    },
    {
      field: "phone",
      headerName: "PHONE",
      width: 130,
    },
    {
      field: "createdAt",
      headerName: "ADDED ON",
      width: 120,
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

  //   const [mData, setMData] = React.useState();
  const { deliveryAgenciesData } = useSelector((state) => state.delivery);
  //   const { ordersData } = useSelector((state) => state.orders);

  //   React.useEffect(() => {
  //     if (ordersData) {
  //       let val = ordersData?.filter(
  //         (item) => item?.deliveryType === "Door Delivery"
  //       );
  //       setMData(val);
  //     }
  //   }, [ordersData]);

  return (
    <div style={{ height: 512, width: "100%" }}>
      <DataGrid
        rows={deliveryAgenciesData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
