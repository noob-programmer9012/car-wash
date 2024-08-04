import { useLoaderData, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import titleCase from "../utils/titleCase";
import "../css/serviceById.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { redirectToLogin } from "../utils/redirect";

const ServiceById = () => {
  const service = useLoaderData();
  const navigate = useNavigate();
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
        <button className="btn" id={service._id} onClick={(e) => addToCart(e)}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ServiceById;
