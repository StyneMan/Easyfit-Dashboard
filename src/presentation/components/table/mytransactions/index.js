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

export default function POSTransactionsTable() {
  const columns = [
    {
      field: "rep",
      headerName: "SALES RESP",
      width: 135,
    },
    {
      field: "image",
      headerName: "IMAGE",
      width: 75,
      renderCell: (params) => (
        <img alt="Profile" src={params?.row?.image} width="56%" />
      ),
    },
    {
      field: "name",
      headerName: "PRODUCT NAME",
      width: 165,
    },
    {
      field: "price",
      headerName: "UNIT PRICE",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "STOCK",
      width: 85,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 100,
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

  const { userData } = useSelector((state) => state.user);
  const [myData, setMyData] = React.useState();
  const { posTransData } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (posTransData && userData) {
      let data = userData?.filter((item) => item?.repId === userData?.id);
      setMyData(data);
    }
  }, [posTransData, userData]);

  return (
    <div style={{ height: 450, width: 750 }}>
      <DataGrid
        rows={myData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
