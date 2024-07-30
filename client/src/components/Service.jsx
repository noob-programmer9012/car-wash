import React from "react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";

import titleCase from "../utils/titleCase";
import { redirectToLogin } from "../utils/redirect";
import "../css/service.css";

const Service = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const services = JSON.parse(data.data);
  const token = useSelector((state) => state.token);

  async function addToCart(e) {
    const url = `http://localhost:5000/addToCart/${e.target.id}`;

    try {
      const data = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (data.data.success && data.status === 201) return navigate("/cart");
    } catch (error) {
      // if (
      //   error.response.data.message === "jwt malformed" ||
      //   error.response.data.message === "jwt expired"
      // )
      //   navigate("/login");
      redirectToLogin(error);
    }
  }

  return (
    <>
      <div className="service">
        {services.map((service) => {
          return (
            <React.Fragment key={service._id}>
              <div
                className="service-data"
                onClick={(e) => {
                  if (e.target.className !== "add")
                    navigate(`/service/${service._id}`);
                }}
                id={service._id}
              >
                <div className="left-data">
                  <h2>{service.serviceName}</h2>
                  <ul>
                    {service.plan.facilities.map((fac, index) => {
                      if (index <= 2) {
                        return (
                          <React.Fragment key={fac}>
                            <li>{titleCase(fac)}</li>
                          </React.Fragment>
                        );
                      }
                    })}
                  </ul>
                  <p className="more">
                    {`+${service.plan.facilities.length - 3} more`}{" "}
                    <ChevronRightIcon />
                  </p>
                  <p>
                    <del>{service.plan.price}</del>{" "}
                    {service.plan.price -
                      Math.round(
                        (service.plan.discount * service.plan.price) / 100
                      )}{" "}
                    {service.plan.discount}% off
                  </p>
                </div>
                <div className="right-data">
                  <img
                    src={"http://localhost:5000" + service.imageUrl}
                    width={200}
                    height={200}
                  ></img>
                  <p className="title">With Underbody</p>
                  <p
                    className="add"
                    id={service._id}
                    onClick={(e) => addToCart(e)}
                  >
                    Add To Cart
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Service;
