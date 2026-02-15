const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Yuyu One Backend funcionando" });
});

app.get("/api/beneficios", (req, res) => {
  res.json([
    { id: 1, nombre: "Seguro de Pantalla", activo: true },
    { id: 2, nombre: "Descuentos Locales", activo: true },
    { id: 3, nombre: "Ahorro en Viajes", activo: true }
  ]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
