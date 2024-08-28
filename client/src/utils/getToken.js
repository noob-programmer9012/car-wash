import { getStoredState } from "redux-persist";

import { persistConf } from "../store/auth";

async function getToken() {
  const data = await getStoredState(persistConf);
  const token = "Bearer " + data.token;
  return token;
}

export default getToken;
