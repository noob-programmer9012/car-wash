import axios from "axios";

import getToken from "../utils/getToken";
import { redirectToLogin } from "../utils/redirect";

export async function adminServices() {
  const url = `http://localhost:5000/admin/getServices`;

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

    return JSON.stringify(data.data.data);
  } catch (error) {
    return redirectToLogin(error);
  }
}
