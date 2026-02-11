import axios from "axios";

export const postRegister = async (body) => {
  try {
    const response = await axios.post("http://localhost:3000/register", body);
    return response.data;
  } catch (error) {
    console.error("Erro no registro:", error.response?.data || error.message);
    alert("Erro ao cadastrar!");
  }
};
