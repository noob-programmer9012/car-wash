import getToken from "../utils/getToken";
import { redirectToLogin } from "../utils/redirect";

export const getUserOrders = async ({ pageNumber = 1, nPerPage = 5 }) => {
  const token = await getToken();
  const url = `http://localhost:5000/getOrders?pageNumber=${pageNumber}&nPerPage=${nPerPage}`;

  const data = await fetch(url, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  if (!res.success && res.message === "jwt expired") {
    return redirectToLogin(res.message);
  }
  return res;
};
