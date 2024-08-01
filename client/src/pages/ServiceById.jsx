import { useLoaderData } from "react-router-dom";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import titleCase from "../utils/titleCase";
import "../css/serviceById.css";

const ServiceById = () => {
  const service = useLoaderData();
  // console.log(service);

  return (
    <div className="serviceById">
      <img src={"http://localhost:5000" + service.imageUrl} />
      <div className="service-details">
        <Typography variant="h6">{service.serviceName}</Typography>
        <Typography variant="p">What&#39;s included</Typography>
        <div className="included">
          <div className="left">
            {service.plan.facilities.map((item, index) => {
              if (index < 4) {
                return (
                  <div className="inluded-detail" key={index}>
                    <div className="icon-container">
                      <CheckIcon
                        sx={{
                          fontSize: "small",
                          position: "relative",
                          left: "0.5px",
                        }}
                      />
                    </div>
                    <p>{titleCase(item)}</p>
                  </div>
                );
              }
            })}
          </div>
          <div className="right">
            {service.plan.facilities.map((item, index) => {
              if (index >= 4) {
                return (
                  <div className="inluded-detail" key={index}>
                    <div className="icon-container">
                      <CheckIcon
                        sx={{
                          fontSize: "small",
                          position: "relative",
                          left: "0.5px",
                        }}
                      />
                    </div>
                    <p>{titleCase(item)}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <button className="btn">ADD TO CART</button>
      </div>
    </div>
  );
};

export default ServiceById;
