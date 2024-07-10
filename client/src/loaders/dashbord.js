import { getStoredState } from "redux-persist";
import { redirect } from "react-router-dom";

import { persistConf } from "../store/auth";

export async function dashboard() {
  const state = await getStoredState(persistConf);
  const token = state.token;
  const user = state.user;
  if (!token || !user) redirect("/login");
  if (token && user !== "user") redirect("/login");
  return null;
}
