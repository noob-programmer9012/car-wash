import axios from "axios";
import { redirectToLogin } from "../utils/redirect";

export const resetPassword = async ({ request }) => {
  const formData = await request.formData();
  const url = `http://localhost:5000/auth/resetPasswordComplete`;

  const entries = Object.fromEntries(formData);

  try {
    const data = await axios.post(url, {
      newPassword: entries["password"],
      token: entries["token"],
    });
    if (data.data.success) {
      return null;
    }
  } catch (error) {
    return redirectToLogin(error);
  }
};
