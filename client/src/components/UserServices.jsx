import { Typography } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";

const UserServices = () => {
  const data = useLoaderData();

  return (
    <div className="all-services">
      {data.services.map((service) => {
        return (
          <React.Fragment key={service._id}>
            <div className="service-details">
              <img
                src={"http://localhost:5000" + service.imageUrl}
                width={200}
                height={200}
              />
              <div className="name">
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {service.serviceName}
                </Typography>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default UserServices;
