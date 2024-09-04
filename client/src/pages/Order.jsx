import { useLoaderData } from "react-router-dom"

import "../css/order.css";
import { Typography } from "@mui/material";

const Order = () => {
  const data = useLoaderData();

  const date = new Date();
  const next = new Date(date);
  next.setDate(date.getDate() + 1);
  const morrow = new Date(next);
  morrow.setDate(next.getDate() + 1);

  const showMiniForm = (e) => {
    const selectors = document.querySelectorAll(".date-selector");
    const images = document.querySelectorAll("img");
    const left = document.querySelectorAll(".item-desc>.item-details");

    images.forEach(image => {
      if (e.target.id === image.id) {
        image.style.display = "none";
        left.forEach(item => {
          if (item.id === e.target.id) item.style.gap = "0";
          else item.style.gap = "1rem";
        })
      }
      else {
        image.style.display = "block";
      }
    });

    selectors.forEach(selector => {
      if (selector.id == e.target.id) {
        selector.classList.remove("hide");
        selector.classList.add("show");
      } else {
        selector.classList.add("hide");
        selector.classList.remove("show");
      }
    });

    const dates = document.querySelectorAll(".date-selector.show>.dates>.date");
    const selected = document.querySelector(".date.select");

    selected && selected.classList.remove("select");
    dates[0].classList.add("select");
  };

  const select = (e) => {
    const dates = document.querySelectorAll(".date-selector.show>.dates>.date");
    dates.forEach(date => {
      if (date === e.target) date.classList.add("select");
      else date.classList.remove("select");
    })
  }

  return (
    <div className="orders-section">
      <div className="item-desc">
        {data.map(item => {
          return (
            <div className="item-details" key={item.serviceId._id} id={item.serviceId._id}>
              <div className="left-part">
                <img src={"http://localhost:5000" + item.serviceId.imageUrl} id={item.serviceId._id} />
              </div>
              <div className="right-part">
                <Typography variant="p">{item.serviceId.serviceName}</Typography>
                <Typography variant="p">Price: {item.serviceId.plan.price}</Typography>
                <input type="button" className="btn date" id={item.serviceId._id} value="Select Date" onClick={(e) => showMiniForm(e)} />
                <div className="date-selector hide" id={item.serviceId._id}>
                  <div className="dates">
                    <div className="date" onClick={(e) => select(e)}><Typography variant="p">{date.getDate()}</Typography></div>
                    <div className="date" onClick={(e) => select(e)}>{next.getDate()}</div>
                    <div className="date" onClick={(e) => select(e)}>{morrow.getDate()}</div>
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
