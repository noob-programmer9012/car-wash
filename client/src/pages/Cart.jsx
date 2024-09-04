import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import "../css/cart.css";
import { useEffect, useState } from "react";
// import CheckoutButton from "../components/CheckoutButton";

const Cart = () => {
  const data = useLoaderData();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const [total, setTotal] = useState(null);

  async function handleRemove(id) {
    const url = `http://localhost:5000/deletCartItem/${id}`;

    try {
      const data = await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (data.status === 201) return navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let sum = 0;
    data.map((item) => {
      sum += Number(item.serviceId.plan.price);
    });
    setTotal(sum);
  }, [data]);

  return (
    <div className="cart-component">
      {data.map((item) => {
        return (
          <div className="cart-item" key={item.serviceId._id}>
            <img
              src={"http://localhost:5000" + item.serviceId.imageUrl}
              width={"100px"}
              height={"100px"}
            ></img>
            <div className="cart-item-detail">
              <Typography variant="h6">{item.serviceId.serviceName}</Typography>
              <Typography variant="p">{item.serviceId.plan.price}</Typography>
            </div>
            <RemoveCircleIcon
              className="remove"
              onClick={() => {
                handleRemove(item.serviceId._id);
              }}
            />
          </div>
        );
      })}
      <p>Sub Total: {total}</p>
      {/* <CheckoutButton amount={total} /> */}
      <Link to='/order'>
        <input type="button" className="btn" value="Checkout" />
      </Link>
    </div>
  );
};

export default Cart;
