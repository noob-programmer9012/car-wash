import { useLoaderData } from "react-router-dom";
import { Fragment } from "react";

export default function Services() {
  const data = useLoaderData();
  const services = JSON.parse(data.data);

  return (
    <>
      <h1>Services</h1>
      {services.map((service) => {
        return (
          <Fragment key={service._id}>
            <h1>{service.serviceName}</h1>
          </Fragment>
        );
      })}
      <img
        src={"http://localhost:5000/assets/svg/car.svg"}
        width={150}
        height={150}
      ></img>
      <video
        src={
          "http://localhost:5000/assets/videos/Screencast from 2024-05-24 13-58-48.webm"
        }
        width={100}
        height={100}
        autoPlay
        muted
      ></video>
    </>
  );
}
