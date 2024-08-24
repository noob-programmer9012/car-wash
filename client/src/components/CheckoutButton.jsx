import React, { useEffect } from 'react';

import getToken from "../utils/getToken";
import { useRouteLoaderData } from 'react-router-dom';

function CheckoutButton({ amount }) {
  const user = useRouteLoaderData("root");
  useEffect(() => {
    console.log(user);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    const url = "http://localhost:5000/checkout";
    const token = await getToken();
    

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify({ total: amount })
    });
    const order = await response.json();

    const options = {
      key: 'rzp_test_kBDtfQdGy3qNno',
      amount: order.order.amount,
      currency: "INR",
      name: "Car Wash",
      description: "Test Transaction",
      order_id: order.order.id,
      handler: async function (response) {
        const body = { ...response, order_id: order.order.id };
        const validatePayment = await fetch("http://localhost:5000/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify(body)
        })
        console.log(await validatePayment.json());
      },
      prefill: {
        name: user.fullname,
        email: user.email,
        contact: user.mobileNo,
      },
      config: {
        display: {
          hide: [{ method: "netbanking" }, {method: "wallet"}, {method: "paylater"}]
        }
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#2c2d34"
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return <button onClick={handlePayment} className='btn'>Pay Now</button>;
}

export default CheckoutButton;
