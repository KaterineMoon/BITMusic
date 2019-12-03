import { Component, OnInit } from '@angular/core';
import { Cancion } from 'src/app/modelos/cancion';
import { CancionService } from 'src/app/servicios/cancion.service';

@Component({
  selector: 'app-song-tools',
  templateUrl: './song-tools.component.html',
  styleUrls: ['./song-tools.component.css']
})
export class SongToolsComponent implements OnInit {
  tituloComponente:string;
  cancion:Cancion;
  cancionCorrecta;
  cargarFichero:boolean;
  filesToUpload: File;
  actualizacionCorrecta:boolean;

  constructor(
    private _cancionService:CancionService
  ) {
    this.cancion = new Cancion('','','','','','');
    this.cargarFichero = false;
    this.tituloComponente = "Crear cancion";
    this.actualizacionCorrecta=false;
   }

  ngOnInit() {
  }

  manejoCancion(){
    if(this.tituloComponente == "Crear cancion"){
      this.crearCancion();
    }else{
      this.actualizarCancion();
    } 
  }

  crearCancion(){
    this._cancionService.crearCancion(this.cancion).subscribe(
      (response:any)=>{
        if(response.cancion){
          this.cancion = response.cancion;
          this.cargarFichero = true;
          this.tituloComponente = "Actualizar cancion";
          this.cancionCorrecta = "La cancion se ha creado correctamente";
        }else{
          this.cancionCorrecta = "No se ha podido crear la cancion, revisa el codigo :(";
        }
      },error=>{
        if (error != null) {
          console.log(error)
        }
      }
    )
  }

  actualizarCancion(){

    this._cancionService.cargarFicheroCancion(this.filesToUpload,this.cancion._id)
    .subscribe(
      (response:any)=>{
        if(response.cancion){
          this.actualizacionCorrecta = true;
          this.cancionCorrecta = "Fichero cargado correctamente";
          setTimeout(()=>{
            this.reset();
          },3000)
        }else{
          this.cancionCorrecta = "No se ha podido cargar la cancion, revisa el codigo :(";
        }
      },error=>{
         if (error != null) {
          console.log(error)
        }
      }
    )

  }

  reset(){
    this.cancion = new Cancion('','','','','','');
    this.cargarFichero = false;
    this.tituloComponente = "Crear cancion";
    this.cancionCorrecta = undefined;
    this.actualizacionCorrecta = false;
  }

  
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
  }


}
