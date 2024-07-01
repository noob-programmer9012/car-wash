import axios from "axios";
import { useLoaderData } from "react-router-dom";

export default function Services() {
  const services = useLoaderData();
  console.log(services);
  //   const videoUrl = services.data[0].imageUrl;

  return (
    <>
      <h1>Services</h1>
    </>
  );
}

export async function serviceLoader() {
  const url = "http://localhost:5000/admin/getServices";
  const token = "Bearer " + localStorage.getItem("token");
  const services = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });

  if (!services.data.success) {
    return;
  }

  return {
    totalServices: services.data.totalServices,
    data: services.data.data,
  };
}
