import { redirect } from "react-router-dom";
import axios from "axios";

import getToken from "../utils/getToken";

export async function categoryAction({ request }) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  formData.append("title", entries["Category Name"]);
  const token = await getToken();
  const url = "http://localhost:5000/admin/category";

  try {
    const data = await axios.post(url, formData, {
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
    return redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }

  return null;
}
