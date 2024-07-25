import axios from "axios";

import getToken from "../utils/getToken";
import { redirectToLogin } from "../utils/redirect";
import getStoredState from "redux-persist/es/getStoredState";
import { persistConf } from "../store/auth";
import { redirect } from "react-router-dom";

export async function dashboard() {
  const token = await getToken();
  const data = await getStoredState(persistConf);
  if (data.user === "admin") return redirect("/admin");

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
