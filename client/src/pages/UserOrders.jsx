import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@mui/material";

import "../css/userOrders.css";
import getToken from "../utils/getToken";

const UserOrders = () => {
  const orders = useLoaderData();

  const downloadInvoice = async (orderId) => {
    const url = `http://localhost:5000/getInvoice/${orderId}`;
    const token = await getToken();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        responseType: "blob",
      };
      const data = await axios.get(url, config);
      const fileUrl = URL.createObjectURL(data.data);
      const dl = document.createElement("a");
      document.body.appendChild(dl);
      dl.href = fileUrl;
      dl.setAttribute("download", "new.pdf");
      dl.click();
      document.body.removeChild(dl);
    } catch (error) {
      console.log(error);
    }

    return null;
  };

  return (
    <div className="userOrders">
      <div className="orders">
        {orders ? (
          orders.orders.map((order) => {
            return (
              <React.Fragment key={order._id}>
                <div className="order">
                  <Typography variant="p">Order ID: {order._id}</Typography>
                  <Typography variant="h5">Order Details</Typography>
                  {order.items.map((item) => {
                    return (
                      <React.Fragment key={item.serviceName}>
                        <div className="items">
                          <div className="item">
                            <ul>
                              <li>
                                <Typography variant="h6">
                                  {item.serviceName} -- &#8377;
                                  {item.serviceId.plan.price}
                                </Typography>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                  <div className="download">
                    <input
                      className="btn blue"
                      type="button"
                      value="Download Invoice"
                      onClick={() => downloadInvoice(order._id)}
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <h3>You have not placed any orders yet!</h3>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
