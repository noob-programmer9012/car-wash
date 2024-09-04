import { useEffect } from "react";
import { useLoaderData } from "react-router-dom"

import "../css/order.css";
import { Typography } from "@mui/material";

const Order = () => {
  const data = useLoaderData();
  useEffect(() => {
    next.setDate(date.getDate() + 1)
    console.log(data, next.getDate());
  }, []);

  const date = new Date();
  const next = new Date(date);
  next.setDate(date.getDate() + 1);
  const morrow = new Date(next);
  morrow.setDate(next.getDate() + 1);

  const showMiniForm = (e) => {
    const selectors = document.querySelectorAll(".date-selector");
    selectors.forEach(selector => {
      if (selector.id == e.target.id) {
        selector.classList.remove("hide");
        selector.classList.add("show");
      } else {
        selector.classList.add("hide");
        selector.classList.remove("show");
      }
    })
  }

  return (
    <div className="orders-section">
      <div className="item-desc">
        {data.map(item => {
          return (
            <div className="item-details" key={item.serviceId._id}>
              <div className="left-part">
                <img src={"http://localhost:5000" + item.serviceId.imageUrl} />
              </div>
              <div className="right-part">
                <Typography variant="p">{item.serviceId.serviceName}</Typography>
                <Typography variant="p">Price: {item.serviceId.plan.price}</Typography>
                <input type="button" className="btn date" id={item.serviceId._id} value="Select Date" onClick={(e) => showMiniForm(e)} />
                <div className="date-selector hide" id={item.serviceId._id}>
                  <div className="dates">
                    <div className="date"><Typography variant="p">{date.getDate()}</Typography></div>
                    <div className="date">{next.getDate()}</div>
                    <div className="date">{morrow.getDate()}</div>
                  </div>
                  <div className="timeSlots">
                    <div className="slots">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Order
