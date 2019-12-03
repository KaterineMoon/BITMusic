import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { Router} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  ubicacion:string;
  usuario:Usuario;

  constructor(
    private _router : Router
  ) { 
    this.ubicacion = "perfil";
    this.usuario = JSON.parse(localStorage.getItem("sesion"));
    if(this.usuario == null){
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  asignarUbicacion(ubicacion){
    this.ubicacion = ubicacion;
  }

}
