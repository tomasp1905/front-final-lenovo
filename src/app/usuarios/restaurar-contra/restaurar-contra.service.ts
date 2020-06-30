import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CodigoRecuperacionPayload } from './recuperacion/CodigoRecuperacionPayload';
import { Observable } from 'rxjs';
import { IniciarRecuperacionPayload } from './recuperacion/IniciarRecuperacionPayload';
import { NuevoPasswordPayload } from './recuperacion/NuevoPasswordPayload';

@Injectable({
  providedIn: 'root'
})
export class RestaurarContraService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private urlEndPointIniciarRecuperacion: string = 'http://localhost:8080/usuario/iniciarRecuperacion';
  private urlEndPointVerificarCodigo: string = 'http://localhost:8080/usuario/verificarCodigo';
  private urlEndPointNuevoPassword: string = 'http://localhost:8080/usuario/nuevoPassword';

  constructor(private http: HttpClient, private router:Router) { }

  iniciarRecuperacion(iniciarRecuperacionPayload: IniciarRecuperacionPayload): Observable<IniciarRecuperacionPayload> {
    return this.http.post<IniciarRecuperacionPayload>(this.urlEndPointIniciarRecuperacion, iniciarRecuperacionPayload)
  }

  verificarCodigo(codigoRecuperacionPayload: CodigoRecuperacionPayload): Observable<CodigoRecuperacionPayload> {
    return this.http.post<CodigoRecuperacionPayload>(this.urlEndPointVerificarCodigo, codigoRecuperacionPayload)
  }

  cambiarPassword(nuevoPasswordPayload: NuevoPasswordPayload): Observable<NuevoPasswordPayload> {
      return this.http.post<NuevoPasswordPayload>(this.urlEndPointNuevoPassword, nuevoPasswordPayload)
    }




}
