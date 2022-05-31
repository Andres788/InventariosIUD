const { Router } = require("express");
const EstadoEquipo = require("../models/EstadoEquipo");

const router = Router();

router.post("/", async function (req, res) {
  try {
    let estadoEquipo = new EstadoEquipo();
    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.email = req.body.email;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaCreacion = new Date();
    estadoEquipo.fechaActualizacion = new Date();
    estadoEquipo = await estadoEquipo.save();
    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error");
  }
});

router.get("/", async function (req, res) {
  try {
    const tipos = await EstadoEquipo.find();
    res.send(tipos);
  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error");
  }
});

router.put("/:estadoEquipoId", async function (req, res) {
  try {
    let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
    if (!estadoEquipo) {
      return res.send("No existe ese estado");
    }
    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.email = req.body.email;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaCreacion = new Date();
    estadoEquipo = await estadoEquipo.save();
    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error");
  }
});
module.exports = router;
