"use strict";

var express = require("express");
var CancionController = require("../controllers/cancion");

var multipart = require('connect-multiparty');
var md_upload = multipart(
    { uploadDir: './uploads/canciones' })

var api = express.Router();

api.post("/cancion", CancionController.crearCancion);
api.delete("/cancion/:id", CancionController.borrarCancion);
api.get("/canciones", CancionController.obtenerTodasCanciones);
api.post('/cargar-fichero-cancion/:id', md_upload, CancionController.cargarFicheroCancion);
api.get('/obtener-fichero-cancion/:songFile', md_upload, CancionController.obtenerFicheroCancion);

module.exports = api;
