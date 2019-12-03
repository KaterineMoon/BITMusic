import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompartidoService {
  public cancion = new Subject<any>();
  public cancionEmitida = this.cancion.asObservable();
  emitirCancion(url:any){
      this.cancion.next(url);
  }

  public logue = new Subject<any>();
  public logueEmitido = this.logue.asObservable();
  emitirLogueo(usuarioLogueado:any){
    this.logue.next(usuarioLogueado);
  }
}
