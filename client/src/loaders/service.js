import axios from "axios";

export async function serviceLoader() {
  const url = "http://localhost:5000/admin/getServices";
  const token = "Bearer " + localStorage.getItem("token");
  const services = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });

  if (!services.data.success) {
    return;
  }

  return {
    totalServices: services.data.totalServices,
    data: services.data.data,
  };
}
