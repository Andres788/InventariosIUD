const { Router } = require('express');
const Inventario = require('../models/Inventario');

const router = Router();

//put = actualizar//
router.put('/:inventarioId', async function(req, res){
  try {
    let inventario= await Inventario.findById(req.params.inventarioId );
    if (!inventario) {
      return res.send('Inventario no existe');
    }

   let existeInventariosPorSerial = await Inventario.findOne( { serial: req.body.serial, _id: { $ne: inventario._id} });

    if (existeInventariosPorSerial){
 return res.send('Ya existe el serial para otro equipo');
    }
   
    inventario.serial = req.body.serial;
    inventario.modelo = req.body.modelo;
    inventario.descripcion = req.body.descripcion;
    inventario.foto = req.body.foto;
    inventario.color = req.body.color;
    inventario.fechaCompra = req.body.fechaCompra;
    inventario.precio = req.body.precio;
    inventario.usuario = req.body.usuario._id;
    inventario.marca = req.body.marca._id;
    inventario.tipoEquipo = req.body.tipoEquipo._id;
    inventario.estadoEquipo = req.body.estadoEquipo._id;
    inventario.fechaCreacion = new Date();
    inventario.fechaActualizacion = new Date();

    inventario = await inventario.save();
    
    res.send(inventario);

  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error al consultar inventarios");
  }
});
  
//get = listar//
router.get('/', async function(req, res){
  try {
    let inventarios = await Inventario.find().populate([
      {
          path: 'usuario', select: 'nombre email estado'
      },
      {
          path: 'marca' , select: 'nombre estado'
      },
      {
          path: 'tipoEquipo', select: 'nombre estado'
      },
      {
          path: 'estadoEquipo', select: 'nombre estado'
      }
    ]);
    res.send(inventarios);
  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error al consultar inventarios");
  }
});
   //post = crear//
  router.post('/', async function(req, res){
    try {
      let existeInventariosPorSerial = await Inventario.findOne( {serial: req.body.serial});
      if (existeInventariosPorSerial){
   return res.send('Ya existe el serial para otro equipo');
      }
      let inventario = new Inventario();
      inventario.serial = req.body.serial;
      inventario.modelo = req.body.modelo;
      inventario.descripcion = req.body.descripcion;
      inventario.foto = req.body.foto;
      inventario.color = req.body.color;
      inventario.fechaCompra = req.body.fechaCompra;
      inventario.precio = req.body.precio;
      inventario.usuario = req.body.usuario._id;
      inventario.marca = req.body.marca._id;
      inventario.tipoEquipo = req.body.tipoEquipo._id;
      inventario.estadoEquipo = req.body.estadoEquipo._id;
      inventario.fechaCreacion = new Date();
      inventario.fechaActualizacion = new Date();

      inventario = await inventario.save();
      
      res.send(inventario);

    } catch (error) {
      console.log(error);
      res.send("Ocurrio un error al consultar inventarios");
    }
  });

  module.exports = router;