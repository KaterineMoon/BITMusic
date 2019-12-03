"use strict";

//trabajar con ficheros
var fs = require('fs');
var path = require('path');

var Cancion = require("../models/cancion");

function crearCancion(req, res) {
  var cancion = new Cancion();
  var params = req.body;

  cancion.titulo = params.titulo;
  cancion.duracion = params.duracion;
  cancion.genero = params.genero;
  cancion.artista = params.artista;

  cancion.save((error, cancionCreada) => {
    if (error) {
      res.status(500).send(
        { message: "Error en el servidor" });
    } else {
      if (!cancionCreada) {
        res.status(200).send(
          { message: "No se pudo crear la cancion" });
      } else {
        res.status(200).send(
          { cancion: cancionCreada });
      }
    }
  });
}

function borrarCancion(req, res) {
  var idCancion = req.params.id;

  Cancion.findByIdAndRemove(idCancion, (error, cancionEliminada) => {
    if (error) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (!cancionEliminada) {
        res.status(200).send(
          { message: "La canción no ha sido eliminada" });
      } else {
        res.status(200).send({ cancion: cancionEliminada });
      }
    }
  });
}

function obtenerTodasCanciones(req, res) {
  //var nombreCancion = req.params.nombre;
  Cancion.find((error, canciones) => {
    if (error) {
      res.status(500).send("Error en el servidor");
    } else {
      if (!canciones) {
        res.status(200).send
          ({ message: "No se encontraron canciones" });
      } else {
        res.status(200).send({ canciones });
      }
    }
  });
}

function cargarFicheroCancion(req, res) {
  var idCancion = req.params.id;
  var file_name = 'No subido...';

  //se valida si viene el archivo con la variable superglobal files
  if (req.files) {
    var file_path = req.files.file.path;
    var file_split = file_path.split('\\');
    //se obtiene nombre del archivo
    var file_name = file_split[2];

    //se obtiene extension fichero
    var exp_split = file_name.split('\.');
    var file_ext = exp_split[1];

    if (file_ext == 'mp3') {
      Cancion.findByIdAndUpdate(idCancion, { archivo: file_name }, (err, cancionActualizada) => {
        if (err) {
          res.status(500).send({ message: 'Error en el servidor' });
        } else {
          if (!cancionActualizada) {
            res.status(404).send({ message: 'No se ha podido actualizar la cancion' });
          } else {
            //devuelve usuario antes de actualizarse
            res.status(200).send({ cancion: cancionActualizada });
          }
        }
      });
    } else {
      res.status(200).send({ message: "Extension del archivo no correcta" });
    }

    console.log(file_path);
  } else {
    res.status(200).send({ message: "no ha subido ninguna cancion" });
  }
}

function obtenerFicheroCancion(req, res) {
  //nombre fichero
  var songFile = req.params.songFile;

  //ruta archivo 
  var path_file = './uploads/canciones/' + songFile;

  //se comprueba si existe
  fs.exists(path_file, function (exists) {
    if (exists) {
      //devolvemos la imagen
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ message: "no existe el fichero de audio" });
    }
  });
}
module.exports = {
  crearCancion,
  borrarCancion,
  obtenerTodasCanciones,
  cargarFicheroCancion,
  obtenerFicheroCancion
};
