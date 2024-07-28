import { redirect } from "react-router-dom";

import axios from "axios";
import getToken from "../utils/getToken";

export async function editCategoryAction({ params, request }) {
  const id = params.id;
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  formData.append("title", entries["Category Name"]);
  const token = await getToken();
  const url = `http://localhost:5000/admin/category/${id}`;

  try {
    await axios.put(url, formData, {
      headers: {
        Authorization: token,
      },
    });

    return redirect("/admin/categories");
  } catch (error) {
    history.pushState(
      { message: error.response.data.message },
      "",
      `/admin/categories/edit-category/${id}`
    );
    return redirect(`/admin/categories/edit-category/${id}`);
  }
}
