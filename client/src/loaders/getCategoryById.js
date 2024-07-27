import axios from "axios";

import { redirectToLogin } from "../utils/redirect";
import getToken from "../utils/getToken";

export const getCategoryById = async ({ params }) => {
  const id = params.id;

  const token = await getToken();
  const url = `http://localhost:5000/admin/getCategory/${id}`;

  try {
    const category = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return category.data.data;
  } catch (error) {
    return redirectToLogin(error);
  }
};
