import axios from "axios";

import getToken from "../utils/getToken";

export async function serviceLoader({ params }) {
  const id = params.id;
  const url = `http://localhost:5000/admin/getServices/${id}`;

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
    return new Response({ statusCode: 500, message: error });
  }
}
