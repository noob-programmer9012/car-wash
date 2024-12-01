// fix add new address with form

import {
  useLoaderData,
  useRouteLoaderData,
  useRevalidator,
} from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";

import getTimeSlots from "../utils/getTimeSlots";
import CheckoutButton from "../components/CheckoutButton";
import AddressSection from "../components/AddressSection";
import getToken from "../utils/getToken";
import Modal from "../components/Modal";
import AddAddress from "../components/AddAddress";
import "../css/order.css";

const Order = () => {
  const data = useLoaderData();
  const validator = useRevalidator();
  const user = useRouteLoaderData("root");
  const items = user.cart.items.map((i) => i.serviceId);
  let primaryAddress =
    user.address.homeNo +
    ", " +
    user.address.landmark +
    ", " +
    user.address.area +
    ".";

  const [frames, setFrames] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [total, setTotal] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [currentItem, setCurrentItem] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    primaryAddress =
      user.secondaryAddress.length > 0
        ? user.secondaryAddress[user.secondaryAddress.length - 1]
            .buildingDetails +
          ", " +
          user.secondaryAddress[user.secondaryAddress.length - 1].landmark +
          ", " +
          user.secondaryAddress[user.secondaryAddress.length - 1].area
        : primaryAddress;
    console.log(primaryAddress);
  }, [user]);

  const [selectedAddress, setSelectedAddress] = useState(() => {
    return items.reduce((acc, id) => {
      acc[id] = primaryAddress;
      return acc;
    }, {});
  });
  const [error, setError] = useState(null);
  const [availibility, setAvailibility] = useState([]);
  const [showExtra, setShowExtra] = useState(false);

  const date = new Date();
  const next = new Date(date);
  next.setDate(date.getDate() + 1);
  const morrow = new Date(next);
  morrow.setDate(next.getDate() + 1);
  const extra = new Date(morrow);
  extra.setDate(morrow.getDate() + 1);

  useEffect(() => {
    const dates = document.querySelectorAll(".date-selector.show>.dates>.date");
    const selected = document.querySelector(".date.select");

    selected && selected.classList.remove("select");
    if (showExtra) {
      dates.forEach((d) => {
        if (d.innerText == date.getDate()) {
          d.remove();
        }
        if (d.innerText == next.getDate()) {
          d.classList.add("select");
          d.click();
        }
      });
    }
  }, [showExtra]);

  useEffect(() => {
    let sum = 0;
    data.map((item) => {
      sum += Number(item.serviceId.plan.price);
    });
    setTotal(sum);
  }, [data, total]);

  useEffect(() => {
    const errorBlock = document.querySelector(".error-block");
    const errorText = document.querySelector(".error");

    if (error) {
      errorBlock.classList.add("show");
      errorText.classList.add("show");
      errorText.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);

  const CheckAvailibility = async (slot, serviceId) => {
    const token = await getToken();
    const url = `http://localhost:5000/slotAvailable?slot=${slot}&serviceId=${serviceId}`;
    const available = await fetch(url, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const jsonAvailble = await available.json();
    return jsonAvailble;
  };

  //check if the slot is available in slots
  useEffect(() => {
    frames.forEach(async (frame) => {
      const slot = `${selectedDate}, ${frame}`;
      const jsonAvailble = await CheckAvailibility(slot, currentItem);
      setAvailibility((availibility) => [
        ...availibility,
        {
          [jsonAvailble.available === 1 ? 1 : 0]: frame,
        },
      ]);
    });
  }, [frames, currentItem]);

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

    if (showExtra) {
      dates.forEach((d) => {
        if (d.innerText == date.getDate()) {
          d.remove();
          d.click();
        }
      });
    }

    dates[0].classList.add("select");
    dates[0].click();

    // const timeSlots = document.querySelectorAll(
    //   ".date-selector.show>.timeSlots>.slots>span",
    // );
    // timeSlots[0].click();
  };

  const select = (e) => {
    setAvailibility([]);
    const dates = document.querySelectorAll(".date-selector.show>.dates>.date");
    setCurrentItem(e.target.getAttribute("item"));

    dates.forEach((date) => {
      if (date === e.target) date.classList.add("select");
      else date.classList.remove("select");
    });
    // if date is today then start time is date.getTIme() elese 8
    let start = 8;
    const dataAttr = e.target.getAttribute("data");
    const givenDate = new Date(dataAttr).toLocaleDateString();

    setSelectedDate(givenDate);
    if (e.target.childNodes[0].textContent === String(date.getDate())) {
      // change start timing based on slot size
      // get total slots for day substract current time from all slots
      // count time from starting time and divide by slot time(e.g 60 min, 120 min)
      // start = date.getHours() + 1;
      start = 8;
      const current = new Date().getHours();
      const diff = current - start;
      const arrayStart = Math.ceil((diff * 60) / e.target.id);
      const slots = getTimeSlots(Number(e.target.id), start, 20);
      setFrames(slots.slice(arrayStart));
      if (slots.slice(arrayStart).length <= 0) setShowExtra(true);
    } else {
      const slots = getTimeSlots(Number(e.target.id), start, 20);
      setFrames(slots);
    }
  };

  const selectSlot = async (e) => {
    const slots = document.querySelectorAll(
      ".date-selector.show>.timeSlots>.slots>.selection",
    );

    const slot = `${selectedDate}, ${e.target.innerText}`;
    const available = await CheckAvailibility(slot, e.target.id);

    if (available.available === 0) {
      e.target.classList.add("disabled");
    } else {
      slots.forEach((slot) => {
        slot.style.border = "2px solid #1976d2";
      });
      if (e.target.className === "selection")
        e.target.style.border = "2px solid #fff";
      else e.target.parentElement.style.border = "2px solid #fff";
      setSelectedSlot({
        ...selectedSlot,
        [e.target.id]: {
          [e.target.id]: `${selectedDate}, ${e.target.innerText}`,
        },
      });
    }
  };

  return (
    <div className="orders-section">
      <div className="error-block">
        <Typography variant="p" className="error">
          {error && error}
        </Typography>
      </div>
      <div className="item-desc">
        {data.map((item) => {
          return (
            <div
              className="item-details"
              key={item.serviceId._id}
              id={item.serviceId._id}
            >
              <div className="left-part">
                <img
                  src={"http://localhost:5000" + item.serviceId.imageUrl}
                  id={item.serviceId._id}
                />
              </div>
              <div className="right-part">
                <Typography variant="p">
                  {item.serviceId.serviceName}
                </Typography>
                <Typography variant="p">
                  Price: {item.serviceId.plan.price}
                </Typography>
                <div className="addresses">
                  <div>
                    <AddressSection
                      id={item.serviceId._id}
                      selectedAddress={selectedAddress}
                      setSelectedAddress={setSelectedAddress}
                      primaryAddress={primaryAddress}
                    />
                  </div>
                  <div onClick={() => setOpen(true)}>
                    <AddHomeWorkIcon className="icons-material" />
                  </div>
                </div>
                <input
                  type="button"
                  className="btn blue"
                  id={item.serviceId._id}
                  value="Select Date"
                  onClick={(e) => showMiniForm(e)}
                />
                <div className="date-selector hide" id={item.serviceId._id}>
                  <div className="dates">
                    <div
                      className="date"
                      data={date}
                      onClick={(e) => select(e)}
                      id={item.serviceId.timeFrame}
                      item={item.serviceId._id}
                    >
                      <Typography variant="p">
                        {/* {date.toLocaleDateString(undefined, { day: "numeric", month: "long" })} */}
                        {date.getDate()}
                      </Typography>
                    </div>
                    <div
                      className="date"
                      data={next}
                      onClick={(e) => select(e)}
                      id={item.serviceId.timeFrame}
                      item={item.serviceId._id}
                    >
                      {next.getDate()}
                    </div>
                    <div
                      className="date"
                      data={morrow}
                      onClick={(e) => select(e)}
                      id={item.serviceId.timeFrame}
                      item={item.serviceId._id}
                    >
                      {morrow.getDate()}
                    </div>
                    <div
                      className={showExtra ? "date" : "date hide"}
                      data={extra}
                      onClick={(e) => select(e)}
                      id={item.serviceId.timeFrame}
                      item={item.serviceId._id}
                    >
                      {extra.getDate()}
                    </div>
                  </div>
                  <div className="timeSlots">
                    <div className="slots">
                      {availibility.map((frame, index) => {
                        return frame[1] ? (
                          <span
                            id={item.serviceId._id}
                            onClick={(e) => selectSlot(e)}
                            className="selection"
                            key={index}
                          >
                            <Typography
                              variant="p"
                              onClick={(e) => selectSlot(e)}
                              id={item.serviceId._id}
                            >
                              {frame[1]}
                            </Typography>
                          </span>
                        ) : (
                          <div className="selection disabled" key={index}>
                            <span>
                              <Typography variant="p">{frame[0]}</Typography>
                            </span>
                          </div>
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
      <CheckoutButton
        amount={total}
        selectedSlot={selectedSlot}
        setError={setError}
        selectedAddress={selectedAddress}
      />
      <Modal
        open={open}
        setOpen={setOpen}
        children={<AddAddress setOpen={setOpen} />}
      />
    </div>
  );
};

export default Order;
