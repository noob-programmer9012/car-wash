import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CustomTable from "../components/Table";

const AdminOrders = () => {
  const orders = useLoaderData();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      orders.map((order) => {
        return {
          id: order._id,
          "Order Details": order.items
            .map((i) => i.serviceId.serviceName)
            .join(", "),
          "Order Status": order.status,
          Address: order.items.map((i) => i.address).join(", "),
          "Time Slot": order.items.map((i) => i.slot).join(", "),
          Customer: order.user.fullname,
          "Contact Number": order.user.mobileNo,
          "Payment Status": order.paymentDetails.paymentId,
        };
      }),
    );
  }, []);

  return (
    <>
      <CustomTable
        rows={rows}
        columns={[
          "Customer",
          "Contact Number",
          "Order Details",
          "Time Slot",
          "Address",
          "Payment Status",
          "Order Status",
        ]}
        edit={true}
      />
    </>
  );
};

export default AdminOrders;
