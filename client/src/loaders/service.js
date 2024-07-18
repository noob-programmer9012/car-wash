import axios from "axios";

import getToken from "../utils/getToken";
import { persistor } from "../store/auth";
import { redirectToLogin } from "../utils/redirect";

export async function serviceLoader({ params }) {
  const id = params.id;
  const url = `http://localhost:5000/getServices/${id}`;

  await persistor.flush();
  const token = await getToken();

  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    if (!data.data.success) {
      throw JSON.stringify(data.data);
    }

    return {
      totalServices: JSON.stringify(data.data.totalServices),
      data: JSON.stringify(data.data.data),
    };
  } catch (error) {
    return redirectToLogin(error);
  }
}
