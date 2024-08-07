import axios from "axios";
import { redirectToLogin } from "../utils/redirect";

export const resetPasswordLoader = async ({ params }) => {
  const resetToken = params.resetToken;

  try {
    const url = `http://localhost:5000/auth/resetPassword/${resetToken}`;
    const data = await axios.get(url);
    return data;
  } catch (error) {
    return redirectToLogin(error);
  }
};
