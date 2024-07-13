import React from "react";
import { useLoaderData } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "../css/service.css";

const Service = () => {
  const data = useLoaderData();
  const services = JSON.parse(data.data);

  return (
    <>
      <div className="service">
        {services.map((service) => {
          return (
            <React.Fragment key={service._id}>
              <div className="service-data">
                <div className="left-data">
                  <h2>{service.serviceName}</h2>
                  <ul>
                    {service.plan.facilities.map((fac, index) => {
                      if (index <= 2) {
                        return (
                          <React.Fragment key={fac}>
                            <li>{fac}</li>
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
