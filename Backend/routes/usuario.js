"use strict";

var express = require("express");
var UsuarioController = require("../controllers/usuario");

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/usuario' })


var api = express.Router();

api.post("/usuario-login", UsuarioController.obtenerUsuario);
api.post("/usuario", UsuarioController.crearUsuario);
api.delete("/usuario/:id", UsuarioController.eliminarUsuario);
api.put("/usuario/:id", UsuarioController.actualizarUsuario);

api.post('/cargar-imagen-usuario/:id', md_upload, UsuarioController.cargarImagenUsuario);
api.get('/obtener-imagen-usuario/:imageFile', md_upload, UsuarioController.obtenerImagenUsuario);


module.exports = api;

