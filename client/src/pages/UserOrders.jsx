import React from "react";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@mui/material";

import "../css/userOrders.css";

const UserOrders = () => {
  const orders = useLoaderData();

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
