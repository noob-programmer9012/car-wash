import axios from "axios";
import getToken from "../utils/getToken";

export const editService = async ({ request, params }) => {
  const id = params.id;
  const token = await getToken();
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);
  const url = `http://localhost:5000/admin/service/${id}`;

  formData.append("serviceName", entries.Title);
  formData.append("category", entries.categories);
  formData.append("plan[price]", entries.Price);
  formData.append("timeFrame", entries["Time Frame"]);
  formData.append("maxOrders", entries["Max Orders"]);
  const arr = entries["facilities"].split(",");
  for (let i = 0; i < arr.length; i++) {
    formData.append("plan[facilities]", arr[i]);
  }
  //   formData.append("plan.facilities", arr);
  formData.append("plan[discount]", entries.Discount);

  console.log(formData);

  try {
    const result = await axios.put(url, formData, {
      headers: {
        Authorization: token,
      },
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
  return null;
};
