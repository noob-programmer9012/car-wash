import axios from "axios";
import { redirectToLogin } from "../utils/redirect";
import { redirect } from "react-router-dom";

export const signUp = async ({ request }) => {
  const url = "http://localhost:5000/auth/signup";

  try {
    const formData = await request.formData();

    const entries = Object.fromEntries(formData);

    const result = await axios.post(url, {
      email: entries["email"],
      fullname: entries["fullname"],
      password: entries["password"],
      address: {
        homeNo: entries["home No"],
        landmark: entries["landmark"],
        area: entries["area"],
      },
      pincode: entries["pincode"],
      city: entries["city"],
      mobileNo: entries["mobile no"],
    });
    console.log(result);
    redirect("/login");
    history.pushState(
      { message: "Successfully created your account!" },
      "",
      "/login"
    );
    return redirect("/login");
  } catch (error) {
    return redirectToLogin(error);
  }
};
