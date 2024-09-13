import { Typography } from "@mui/material";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const UserServices = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/service/${e.target.id}`);
  };

  return (
    <div className="all-services">
      {data.services !== "No services added yet." ? data.services.map((service) => {
        return (
          <React.Fragment key={service._id}>
            <div
              id={service._id}
              className="service-details"
              onClick={handleClick}
            >
              <img
                src={"http://localhost:5000" + service.imageUrl}
                width={200}
                height={200}
                id={service._id}
                onClick={handleClick}
              />
              <div className="name">
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1rem" }}
                  id={service._id}
                  onClick={handleClick}
                >
                  {service.serviceName}
                </Typography>
              </div>
            </div>
          </React.Fragment>
        );
      }) : <h1>Services will be added soon</h1>}
    </div>
  );
};

export default UserServices;
