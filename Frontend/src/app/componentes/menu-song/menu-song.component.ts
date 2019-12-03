import { Component, OnInit } from '@angular/core';
import { Cancion } from 'src/app/modelos/cancion';
import { CancionService } from 'src/app/servicios/cancion.service';
import { Usuario } from 'src/app/modelos/usuario';
import { CompartidoService } from 'src/app/servicios/compartido.service';


@Component({
  selector: 'app-menu-song',
  templateUrl: './menu-song.component.html',
  styleUrls: ['./menu-song.component.css']
})
export class MenuSongComponent implements OnInit {
  canciones:Cancion[];
  existenCanciones;
  alertaCanciones;
  avisoCanciones;
  usuario:Usuario;

  constructor(
    private _cancionService:CancionService,
    private _servicioCompartido:CompartidoService
  ) {
    this.existenCanciones = false;
    this.usuario = JSON.parse(localStorage.getItem("sesion"));
   }

  ngOnInit() {
    this.cargarCanciones();
  }

  cargarCanciones(){
    this._cancionService.obtenerCanciones().subscribe(
      (response:any)=>{
        if(response.canciones){
          this.canciones = response.canciones;
          this.existenCanciones = true;
        }else{
          this.alertaCanciones = "No se pudieron cargar las canciones, contacte al administrador de la aplicacion";
        }
      },error=>{
        if (error != null) {
          console.log(error)
        }
      }
    )
  }

  agregarListaReproduccion(cancion){
    this.avisoCanciones= "cancion agregada al reproductor";
    var playlist = [];
    if(localStorage.getItem("playlist") != null){
      playlist = JSON.parse(localStorage.getItem("playlist"))
      playlist.push(cancion)
    }else{
      playlist.push(cancion)
    }
    localStorage.setItem("playlist",JSON.stringify(playlist));
    this._servicioCompartido.emitirCancion(cancion);

  }

  eliminarCancion(cancion){
    this._cancionService.eliminarCancion(cancion._id).subscribe(
      (response:any)=>{
        if(response.cancion){
          this.avisoCanciones = "cancion eliminada";
          this.cargarCanciones();
        }else{
          this.avisoCanciones = "la cancion no se elimino, revisa el codigo :(";
        }
      },error=>{
         if (error != null) {
          console.log(error)
        }
      }
    )
  }

}
