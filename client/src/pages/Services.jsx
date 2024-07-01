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
