import axios from "axios";
import { redirectToLogin } from "../utils/redirect";
import { redirect } from "react-router-dom";
// import { redirect } from "react-router-dom";

export const signUp = async ({ request }) => {
  const url = "http://localhost:5000/auth/signup";

  try {
    const formData = await request.formData();

    const entries = Object.fromEntries(formData);

    // formData.append("email", entries["email"]);
    // formData.append("password", entries["password"]);
    // formData.append("fullname", entries["fullname"]);
    // formData.append("address", {
    //   homeNo: entries["home No"],
    //   landmark: entries["landmark"],
    //   area: entries["area"],
    // });
    // formData.append("address.homeNo", entries["home No"]);
    // formData.append("address.landmark", entries["landmark"]);
    // formData.append("address.area", entries["area"]);
    // formData.append("picode", entries["pincode"]);
    // formData.append("city", entries["city"]);
    // formData.append("mobileNo", entries["mobile no"]);
    // formData.delete("home No");
    // formData.delete("mobile no");

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
    return "User Created Successfully";
  } catch (error) {
    console.log(error);
    return redirectToLogin(error);
  }
};
