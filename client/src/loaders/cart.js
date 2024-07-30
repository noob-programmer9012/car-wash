import axios from "axios";

import getToken from "../utils/getToken";
import { redirectToLogin } from "../utils/redirect";

export const cart = async () => {
  const token = await getToken();
  const url = "http://localhost:5000/getCart";

  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    return data.data.cart;
  } catch (error) {
    return redirectToLogin(error);
  }
};
