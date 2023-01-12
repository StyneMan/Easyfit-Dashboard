import * as React from "react";
import {
  DataGrid,
  //   GridToolbarContainer,
  //   GridToolbarColumnsButton,
  //   GridToolbarFilterButton,
  //   GridToolbarExport,
  //   GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../misc/placeholder/custom_no_data";
import ActionButtons from "./action_buttons";
import { useSelector } from "react-redux";

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

export default function MyDeliveriesTable() {
  const columns = [
    {
      field: "orderNo",
      headerName: "ORDER NO:",
      width: 98,
      valueGetter: (params) => `${params?.row?.order?.orderNo}`,
    },
    {
      field: "id",
      headerName: "SET DELIVERY STATUS",
      width: 225,
      renderCell: (params) => {
        return <ActionButtons selected={params} />;
      },
    },
  ];

  const [myDeliveries, setMyDeliveries] = React.useState([]);
  const { deliveryData } = useSelector((state) => state.delivery);
  const { userData } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (deliveryData && userData) {
      const deliv = deliveryData?.filter(
        (item) => item.agent.id === userData?.id
      );
      setMyDeliveries(deliv);
    }
  }, [deliveryData, userData]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={myDeliveries}
        columns={columns}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
