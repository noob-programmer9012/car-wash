import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@mui/material";

import "../css/userOrders.css";

const UserOrders = () => {
  const orders = useLoaderData();

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div className="userOrders">
      <div className="orders">
        {orders ? (
          orders.orders.map((order) => {
            return (
              <React.Fragment key={order._id}>
                <div className="order">
                  {order.items.map((item) => {
                    return (
                      <React.Fragment key={item.serviceName}>
                        <div className="items">
                          <div className="item">
                            <Typography variant="h5">Order Details</Typography>
                            <Typography variant="p">
                              Order ID: {order._id}
                            </Typography>

                            <ul>
                              <li>
                                <Typography variant="h6">
                                  {item.serviceName}
                                </Typography>
                              </li>
                            </ul>
                          </div>
                          <div className="download">
                            <input
                              className="invoice"
                              type="button"
                              value="Download Invoice"
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
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
