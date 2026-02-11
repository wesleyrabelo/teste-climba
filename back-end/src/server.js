const express = require("express");
const cors = require("cors");
const { postRegister } = require("./services/registerService");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const result = await postRegister(req.body);

    res.status(201).json(result);
  } catch (error) {
    if (error.errno === 1062) {
      return res.status(400).json({ message: "Email já cadastrado!" });
    }
    res.status(500).json({ message: "Erro no servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
