import axios from "axios";

// import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { store } from "../store/auth";

export default function Services() {
  const url = "http://localhost:5000/admin/getServices";

  // const services = useLoaderData();
  const [services, setServices] = useState(undefined);

  useEffect(() => {
    const data = store.getState();
    const token = "Bearer " + data.token;

    async function fetchData() {
      const data = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      if (!data.data.success) {
        console.log(data);
        return;
      }
      setServices(JSON.stringify(data.data.data));
      return {
        totalServices: data.data.totalServices,
        data: data.data.data,
      };
    }
    fetchData();
    console.log(services);
  }, [services]);

  //   const videoUrl = services.data[0].imageUrl;

  return (
    <>
      <h1>Services</h1>
      {services ? (
        JSON.parse(services).map((service) => {
          return <p key={service._id}>{service.videoUrl}</p>;
        })
      ) : (
        <h1>loading...</h1>
      )}
      <img
        src={"http://localhost:5000/assets/svg/car.svg"}
        width={150}
        height={150}
      ></img>
      <video
        src={
          "http://localhost:5000/assets/videos/Screencast from 2024-05-24 13-58-48.webm"
        }
        width={1500}
        height={1500}
        autoPlay
        muted
      ></video>
    </>
  );
}
