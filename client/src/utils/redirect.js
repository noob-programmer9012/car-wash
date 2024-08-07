import { redirect } from "react-router-dom";
import { authActions, store } from "../store/auth";

export const redirectToLogin = (error) => {
  if (
    error.response.data.message === "jwt expired" ||
    error.response.data.message === "jwt malformed"
  ) {
    history.pushState({ message: "JWT EXPIRED" }, "", "/login");
    store.dispatch(authActions.setUser({ user: undefined, token: undefined }));
    return redirect("/login");
  } else if (
    error.response.data.message === "Wrong reset token or token expired" ||
    error.response.data.message === "Reset token expired"
  ) {
    history.pushState({ message: "Reset Token Expired!" }, "", "/login");
    store.dispatch(authActions.setUser({ user: undefined, token: undefined }));
    return redirect("/login");
  }
  return error.response.data.message;
};
