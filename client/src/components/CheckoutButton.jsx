import { useEffect } from "react";
import PropTypes from "prop-types";

import getToken from "../utils/getToken";
import {
  useNavigate,
  useRevalidator,
  useRouteLoaderData,
} from "react-router-dom";

function CheckoutButton({ amount, selectedSlot, selectedAddress, setError }) {
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  let revalidator = useRevalidator();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    const url = "http://localhost:5000/checkout";
    const token = await getToken();

    const selectedSlotLen = Object.keys(selectedSlot).length;
    const selectedAddressLen = Object.keys(selectedAddress).length;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        total: amount,
        slotLength: selectedSlotLen,
        selectedAddressLen,
      }),
    });

    const order = await response.json();
    if (!order.success) setError(order.message);

    const options = {
      key: "rzp_test_kBDtfQdGy3qNno",
      amount: order.order.amount,
      currency: "INR",
      name: "Car Wash",
      description: "Test Transaction",
      order_id: order.order.id,
      handler: async function (response) {
        const body = {
          ...response,
          order_id: order.order.id,
          selectedSlot,
          selectedAddress,
        };
        const validatePayment = await fetch(
          "http://localhost:5000/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(body),
          },
        );
        console.log(await validatePayment.json());
        revalidator.revalidate();
        navigate("/orders");
      },
      prefill: {
        name: user.fullname,
        email: user.email,
        contact: user.mobileNo,
      },
      config: {
        display: {
          hide: [
            { method: "netbanking" },
            { method: "wallet" },
            { method: "paylater" },
          ],
        },
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#2c2d34",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button onClick={handlePayment} className="btn">
      Pay Now
    </button>
  );
}

CheckoutButton.propTypes = {
  amount: PropTypes.number.isRequired,
  selectedSlot: PropTypes.object.isRequired,
  selectedAddress: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
};

export default CheckoutButton;
