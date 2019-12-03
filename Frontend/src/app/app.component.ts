import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompartidoService } from './servicios/compartido.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = './assets/images/logo.jpg';
  usuarioLogueado = false;

  constructor(
    private _compartidoService:CompartidoService,
    private _router: Router
  ){
    if(localStorage.getItem("sesion") != null){
      this.usuarioLogueado = true;
    }
    this._compartidoService.logueEmitido.subscribe(
      usuarioLogueado =>{
        this.usuarioLogueado = usuarioLogueado;
      }
    );
  }

  cerrarSesion(){
    this.usuarioLogueado = false;
    localStorage.removeItem("sesion");
    localStorage.removeItem("playlist");
    this._router.navigate(['/']);
  }

}
