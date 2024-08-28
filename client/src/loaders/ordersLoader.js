import { redirect } from "react-router-dom";
import getToken from "../utils/getToken";

export const ordersLoader = async () => {
  const token = await getToken();
  const url = "http://localhost:5000/admin/getOrders";
  const data = await fetch(url, {
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    }
  });
  const parsedData = await data.json();
  if (parsedData.success) return parsedData.orders;
  else return redirect("/");
}
