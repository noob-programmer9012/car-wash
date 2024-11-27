import getToken from "../utils/getToken";

export const addAddress = async ({ request }) => {
  const formData = await request.formData();
  const token = await getToken();
  console.log(formData, token);
  return null;
};
