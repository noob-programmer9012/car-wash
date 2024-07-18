import { redirect } from "react-router-dom";
import { authActions, store } from "../store/auth";

export const redirectToLogin = (error) => {
  if (error.response.data.message === "jwt expired") {
    history.pushState({ message: "JWT EXPIRED" }, "", "/login");
    store.dispatch(authActions.setUser({ user: undefined, token: undefined }));
    return redirect("/login");
  }
  return new Response({ statusCode: 500, message: error });
};
