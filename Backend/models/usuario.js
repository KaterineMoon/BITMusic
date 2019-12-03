"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
  nombre: String,
  edad: String,
  correo: String,
  password: String,
  imagen: String,
  role: String
});

module.exports = mongoose.model("usuario", UsuarioSchema);
