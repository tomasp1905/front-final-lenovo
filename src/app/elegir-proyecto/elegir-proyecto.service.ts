import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ElegirProyectoService {

  // private urlEndPointCambiarEstadoBianual: string = 'http://localhost:8080/disponibilidadProyecto/cambiarEstadoProyectoBianual';
  // private urlEndPointCambiarEstadoBienestar: string = 'localhost:8080/disponibilidadProyecto/cambiarEstadoProyectoBienestar';
  // private urlEndPointCambiarEstadoEspecial: string = 'localhost:8080/disponibilidadProyecto/cambiarEstadoProyectoEspecial';
  // private urlEndPointCambiarEstadoEstable: string = 'localhost:8080/disponibilidadProyecto/cambiarEstadoProgramaEstable';
  //
  // private urlEndPointVerEstadoBianual: string = 'localhost:8080/disponibilidadProyecto/verEstadoProyectoBianual';
  // private urlEndPointVerEstadoBienestar: string = 'localhost:8080/disponibilidadProyecto/verEstadoProyectoBienestar';
  // private urlEndPointVerEstadoEspecial: string = 'localhost:8080/disponibilidadProyecto/verEstadoProyectoEspecial';
  // private urlEndPointVerEstadoEstable: string = 'localhost:8080/disponibilidadProyecto/verEstadoProgramaEstable';


    private server = environment.API_URL;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    public findAll() {
      return this.http.get(`${this.server}/disponibilidadProyecto/verEstadoProyectoBianual`, { headers: this.headers });
    }

    public update(id: number) {
      return this.http.put(`${this.server}/disponibilidadProyecto/cambiarEstadoProyectoBienestar/${id}`, {}, { headers: this.headers });
    }


}
