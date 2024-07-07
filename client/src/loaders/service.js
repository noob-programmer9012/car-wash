import axios from "axios";
import { getStoredState } from "redux-persist";
import storage from "redux-persist/lib/storage";

export async function serviceLoader() {
  const url = "http://localhost:5000/admin/getServices";

  const persistConf = {
    key: "root",
    version: 1,
    storage,
  };

  const state = await getStoredState(persistConf);
  const token = "Bearer: " + state.token;

  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    if (!data.data.success) {
      return new Response(JSON.stringify(data.data));
    }

    return {
      totalServices: JSON.stringify(data.data.totalServices),
      data: JSON.stringify(data.data.data),
    };
  } catch (error) {
    return error;
  }
}
