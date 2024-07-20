import { useLoaderData } from "react-router-dom";

const Customers = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="customers">
      <h1>Customers</h1>
    </div>
  );
};

export default Customers;
