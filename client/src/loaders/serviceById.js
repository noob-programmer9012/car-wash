import axios from "axios";

import { redirectToLogin } from "../utils/redirect";
import getToken from "../utils/getToken";

export const serviceById = async ({ params }) => {
  const id = params.id;

  const token = await getToken();
  const url = `http://localhost:5000/service/${id}`;

  try {
    const service = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    return service.data.data;
  } catch (error) {
    return redirectToLogin(error);
  }
};
