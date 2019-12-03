import { Component, OnInit, OnChanges, DoCheck, AfterViewChecked } from '@angular/core';
import { CompartidoService } from 'src/app/servicios/compartido.service';
import { Cancion } from 'src/app/modelos/cancion';
import { CancionService } from 'src/app/servicios/cancion.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  url = "http://localhost:3977/api/obtener-fichero-cancion/"
  canciones: Cancion[];
  indiceCancion = 0;
  cancionActual;
  avisoCanciones;
  playlistInLocalStorage;

  constructor(
    private _cancionService: CancionService,
    private _servicioCompartido: CompartidoService
  ) {
    this.canciones = new Array();
    if (localStorage.getItem("playlist") != null) {
      this.canciones = JSON.parse(localStorage.getItem("playlist"));
      this.playlistInLocalStorage = true;
    }
    this._servicioCompartido.cancionEmitida.subscribe(
      cancion => {
        this.canciones.push(cancion);
        let totalCanciones = this.canciones.length;
        if (totalCanciones == 1) {
          this.iniciarReproductor();
        }
      }
    )
  }

  ngOnInit() {
    if (this.playlistInLocalStorage) {
      this.iniciarReproductor();
    }
  }

  obtenerIndiceCancion() {
    return this.indiceCancion;
  }

  aumentarIndiceCancion() {
    this.indiceCancion++;
  }

  cambiarNombreCancionActual(cancionActual) {
    this.cancionActual = cancionActual;
  }

  resetIndiceCancion() {
    this.indiceCancion = 1;
  }

  iniciarReproductor() {
    var audio = document.getElementById("audio");
    audio.setAttribute("src", this.url + this.canciones[0].archivo);
    this.cambiarNombreCancionActual(this.canciones[0].titulo)
    this.aumentarIndiceCancion();


    audio.addEventListener('ended', () => {
      let indice = this.obtenerIndiceCancion();
      if (indice < this.canciones.length) {
        audio.setAttribute("src", this.url + this.canciones[indice].archivo);
        this.cambiarNombreCancionActual(this.canciones[indice].titulo)
        let repro = audio as any;
        repro.play();
        this.aumentarIndiceCancion();
      } else {
        audio.setAttribute("src", this.url + this.canciones[0].archivo)
        this.cambiarNombreCancionActual(this.canciones[0].titulo)
        this.resetIndiceCancion();
      }
    })
  }

  eliminarCancion(cancion) {
    for (var i = 0; i < this.canciones.length; i++) {
      if (cancion._id == this.canciones[i]._id) {
        this.canciones.splice(i, 1);
        // console.log(this.canciones)
      }
    }
    let cancionlocalStorage = JSON.parse(localStorage.getItem("playlist"))
    console.log(cancionlocalStorage)
    for (var i = 0; i < cancionlocalStorage.length; i++) {
      if (cancion._id == cancionlocalStorage[i]._id) {
        cancionlocalStorage.splice(i, 1)
        console.log(cancionlocalStorage)
      }
      localStorage.setItem("playlist", JSON.stringify(cancionlocalStorage))
    }
  }

}
