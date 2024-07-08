import axios from "axios";

import getToken from "../utils/getToken";

export async function categoryLoader() {
  const token = await getToken();

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

    return {
      totalCategories: JSON.stringify(data.data.totalCategories),
      data: JSON.stringify(data.data.data),
    };
  } catch (error) {
    return new Response({ statusCode: 500, message: error });
  }
}
