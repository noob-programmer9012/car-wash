import { useLoaderData } from "react-router-dom";
import { Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import getTimeSlots from "../utils/getTimeSlots";
import CheckoutButton from "../components/CheckoutButton";
import "../css/order.css";

const Order = () => {
  const data = useLoaderData();
  const [frames, setFrames] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [total, setTotal] = useState();
  const [selectedSlot, setSelectedSlot] = useState({});

  const date = new Date();
  const next = new Date(date);
  next.setDate(date.getDate() + 1);
  const morrow = new Date(next);
  morrow.setDate(next.getDate() + 1);

  useEffect(() => {
    let sum = 0;
    data.map((item) => {
      sum += Number(item.serviceId.plan.price);
    });
    setTotal(sum);
    console.log(total);
  }, [data, total]);

  const showMiniForm = (e) => {
    const selectors = document.querySelectorAll(".date-selector");
    const images = document.querySelectorAll("img");
    const left = document.querySelectorAll(".item-desc>.item-details");

    images.forEach((image) => {
      if (e.target.id === image.id) {
        image.style.display = "none";
        left.forEach((item) => {
          if (item.id === e.target.id) item.style.gap = "0";
          else item.style.gap = "1rem";
        });
      } else {
        image.style.display = "block";
      }
    });

    selectors.forEach((selector) => {
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
    dates.forEach((date) => {
      if (date === e.target) date.classList.add("select");
      else date.classList.remove("select");
    });
    // if date is today then start time is date.getTIme() elese 8
    let start = 8;
    setSelectedDate(e.target.innerText);
    if (e.target.childNodes[0].textContent === String(date.getDate())) start = date.getHours() + 1;
    const slots = getTimeSlots(Number(e.target.id), start, 20);
    setFrames(slots);
  };

  const selectSlot = (e) => {
    const slots = document.querySelectorAll(".date-selector.show>.timeSlots>.slots>span");
    slots.forEach((slot) => {
      slot.style.border = "2px solid #fff";
    });
    e.target.style.border = "2px solid #1976d2";
    setSelectedSlot({
      ...selectedSlot,
      [e.target.id]: { [e.target.id]: `${selectedDate}, ${e.target.innerText}` },
    });
  };

  return (
    <div className="orders-section">
      <div className="item-desc">
        {data.map((item) => {
          return (
            <div className="item-details" key={item.serviceId._id} id={item.serviceId._id}>
              <div className="left-part">
                <img
                  src={"http://localhost:5000" + item.serviceId.imageUrl}
                  id={item.serviceId._id}
                />
              </div>
              <div className="right-part">
                <Typography variant="p">{item.serviceId.serviceName}</Typography>
                <Typography variant="p">Price: {item.serviceId.plan.price}</Typography>
                <input
                  type="button"
                  className="btn date"
                  id={item.serviceId._id}
                  value="Select Date"
                  onClick={(e) => showMiniForm(e)}
                />
                <div className="date-selector hide" id={item.serviceId._id}>
                  <div className="dates">
                    <div className="date" onClick={(e) => select(e)} id={item.serviceId.timeFrame}>
                      <Typography variant="p">
                        {/* {date.toLocaleDateString(undefined, { day: "numeric", month: "long" })} */}
                        {date.getDate()}
                      </Typography>
                    </div>
                    <div className="date" onClick={(e) => select(e)} id={item.serviceId.timeFrame}>
                      {next.getDate()}
                    </div>
                    <div className="date" onClick={(e) => select(e)} id={item.serviceId.timeFrame}>
                      {morrow.getDate()}
                    </div>
                  </div>
                  <div className="timeSlots">
                    <div className="slots">
                      {frames.map((f) => {
                        return (
                          <Fragment key={f}>
                            <span id={item.serviceId._id} onClick={(e) => selectSlot(e)}>
                              <Typography variant="p">{f}</Typography>
                            </span>
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CheckoutButton amount={total} selectedSlot={selectedSlot} />
    </div>
  );
};

export default Order;
