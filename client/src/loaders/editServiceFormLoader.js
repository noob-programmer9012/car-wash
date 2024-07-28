import axios from "axios";

import getToken from "../utils/getToken";
import { redirectToLogin } from "../utils/redirect";

export async function editServiceFormLoader({ params }) {
  const token = await getToken();
  const id = params.id;
  let categories = "";
  let service = "";

  //   load all categories
  try {
    const url = "http://localhost:5000/admin/getCategories";

    try {
      const data = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      if (!data.data.success) {
        return new Response(JSON.stringify(data.data));
      }

      categories = JSON.stringify(data.data.data);
    } catch (error) {
      return redirectToLogin(error);
    }

    // load service by id
    try {
      const url = `http://localhost:5000/admin/getService/${id}`;

      const data = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      if (!data.data.success) {
        return new Response(JSON.stringify(data.data));
      }

      service = JSON.stringify(data.data.data);

      return { categories, service };
    } catch (error) {
      return redirectToLogin(error);
    }
  } catch (error) {
    return redirectToLogin(error);
  }
}
