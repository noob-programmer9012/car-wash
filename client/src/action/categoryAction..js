import { redirect } from "react-router-dom";

import axios from "axios";
import getToken from "../utils/getToken";

export async function categoryAction({ request }) {
  const formData = await request.formData();
  const token = await getToken();
  const url = "http://localhost:5000/admin/category";

  try {
    const data = await axios.post(url, formData, {
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
    redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }

  console.log(formData);

  return null;
}
