import React, { useEffect } from 'react';

import getToken from "../utils/getToken";

function CheckoutButton({ amount }) {
  useEffect(() => {
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
      handler: function (response) {
        alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Parth Patel",
        email: "parth.sclub@gmail.com",
        contact: "7359959012"
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
