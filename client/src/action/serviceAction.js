import axios from "axios";
import getToken from "../utils/getToken";
import { redirect } from "react-router-dom";

export const serviceAction = async ({ request }) => {
  const token = await getToken();
  const url = "http://localhost:5000/admin/service";

  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  formData.append("serviceName", entries.Title);
  formData.append("category", entries.categories);
  formData.append("plan.price", entries.Price);
  const arr = entries["facilities"].split(",");
  for (let i = 0; i < arr.length; i++) {
    formData.append("plan.facilities", arr[i]);
  }
  //   formData.append("plan.facilities", arr);
  formData.append("plan.discount", entries.Discount);
  console.log(arr);

  try {
    const result = await axios.post(url, formData, {
      headers: {
        Authorization: token,
      },
    });
    console.log(result);
    redirect("/admin/add-service");
  } catch (error) {
    console.log(error);
  }
  return null;
};
