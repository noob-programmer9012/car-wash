import axios from "axios";

import getToken from "../utils/getToken";
import { redirectToLogin } from "../utils/redirect";

export async function dashboard() {
  const token = await getToken();

  const url = "http://localhost:5000/getUser";

  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return data.data.user;
  } catch (error) {
    return redirectToLogin(error);
  }
}
