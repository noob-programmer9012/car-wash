import axios from "axios";

import getToken from "../utils/getToken";

export const addAddress = async ({ request }) => {
  const formData = await request.formData();
  const token = await getToken();
  const entries = Object.fromEntries(formData);

  const url = "http://localhost:5000/addAddress";

  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      buildingDetails: entries["home No"],
      landmark: entries.landmark,
      area: entries.area,
      pincode: entries.pincode,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const response = await data.json();
  return response;
};
