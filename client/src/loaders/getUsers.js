import { redirectToLogin } from "../utils/redirect";
import axios from "axios";

import getToken from "../utils/getToken";

export const getUsers = async () => {
  const token = await getToken();
  try {
    const url = "http://localhost:5000/admin/getUsers";
    const data = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return data.data.users;
  } catch (error) {
    return redirectToLogin(error);
  }
};
