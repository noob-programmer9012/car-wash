import axios from "axios";
import getToken from "../utils/getToken";
import { persistor } from "../store/auth";

import { redirectToLogin } from "../utils/redirect";

export async function userCategory() {
  await persistor.flush();

  const token = await getToken();
  const url = "http://localhost:5000/getCategories";

  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    if (!data.data.success) {
      return new Response(JSON.stringify(data.data));
    }

    return {
      totalCategories: data.data.totalCategories,
      data: data.data.data,
    };
  } catch (error) {
    return redirectToLogin(error);
  }
}
