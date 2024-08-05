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
    console.log(category);
    return {
      data: category.data.data,
      message: history.state.message ? history.state.message : "",
    };
  } catch (error) {
    return redirectToLogin(error);
  }
};
