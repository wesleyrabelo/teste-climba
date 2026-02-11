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
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
