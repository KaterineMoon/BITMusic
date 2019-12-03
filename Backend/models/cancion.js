"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CancionSchema = Schema({
  titulo: String,
  duracion: String,
  genero: String,
  artista: String,
  archivo: String
});

module.exports = mongoose.model("cancion", CancionSchema);
