import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usuario: Usuario;
  filesToUpload: File;
  actualizacionCorrecta;
  url = "http://localhost:3977/api/";

  constructor(
    private _usuarioService: UsuarioService
  ) {
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("sesion"))
    console.log(this.usuario)
  }




  actualizarDatos() {
    this._usuarioService.actualizarUsuario(this.usuario._id, this.usuario).subscribe(
      (response: any) => {
        if (response.usuario) {
          if (this.filesToUpload != undefined) {
            this._usuarioService.cargarImagenUsuario(this.filesToUpload, this.usuario._id)
              .subscribe(
                (response: any) => {
                  if (response.usuario) {
                    this.actualizacionCorrecta = "Datos actualizados correctamente";
                    this.usuario = response.usuario;
                    localStorage.setItem("sesion", JSON.stringify(this.usuario));
                  } else {
                    this.actualizacionCorrecta = "los datos no se actualizaron por completo contacta al administrador de la aplicacion";
                  }
                }, error => {
                  if (error != null) {
                    console.log(error)
                  }
                }
              )
          };
          localStorage.setItem("sesion", JSON.stringify(this.usuario));
        } else {
          this.actualizacionCorrecta = "No se han podido actualizar sus datos, comuniquese con el administrador de la aplicacion";
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
  }

}
