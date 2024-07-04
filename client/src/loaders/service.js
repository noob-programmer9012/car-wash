import axios from "axios";

import { store } from "../store/auth";

export async function serviceLoader() {
  const url = "http://localhost:5000/admin/getServices";

  const data = store.getState();
  const token = "Bearer " + data.token;
  console.log("token: " + token);

  const services = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });

  if (!services.data.success) {
    console.log(services);
    return;
  }

  return {
    totalServices: services.data.totalServices,
    data: services.data.data,
  };
  // if (data._persist.rehydrated) {

  // }
  // return store.getState();
}
