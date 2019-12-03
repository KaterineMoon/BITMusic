import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-index',
  templateUrl: './content-index.component.html',
  styleUrls: ['./content-index.component.css'],
  providers:[]
})
export class ContentIndexComponent implements OnInit {
  usuario: Usuario;
  registroCorrecto;

  constructor(
    private _usuarioService : UsuarioService,
    private _router : Router
  ) {
    if(localStorage.getItem("sesion") != null){
      this._router.navigate(['/menu']);
    }
    this.usuario = new Usuario('', '', null, '', '', '', '');
  }

  ngOnInit() {
  }

  registrar() {
    this._usuarioService.registrar(this.usuario).subscribe(
      (response: any) => {
        if (response.usuario) {
          this.registroCorrecto = "El registro es correcto te puedes loguear con el email "+this.usuario.correo;
        } else {
          this.registroCorrecto = "no se ha realizado el registro del usuario, consulte con soporte ";
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )
  }

}
