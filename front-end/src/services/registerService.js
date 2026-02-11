import axios from "axios";

export const postRegister = async (body) => {
  const response = await axios.post("http://localhost:3000/register", body);
  return response.data;
};
