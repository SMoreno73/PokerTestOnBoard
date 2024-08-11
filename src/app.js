const express = require("express");
const pokerRoutes = require("./routes/pokerRoutes");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/poker/validation", pokerRoutes);

module.exports = app;
