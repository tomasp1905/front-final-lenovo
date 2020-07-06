import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElegirProyectoService {

  private urlEndPointCambiarEstadoBianual: string = 'localhost:8080/disponibilidadProyecto/cambiarEstadoProyectoBianual';
  private urlEndPointCambiarEstadoBienestar: string = 'localhost:8080/disponibilidadProyecto/cambiarEstadoProyectoBienestar';
  private urlEndPointCambiarEstadoEspecial: string = 'localhost:8080/disponibilidadProyecto/cambiarEstadoProyectoEspecial';
  private urlEndPointCambiarEstadoEstable: string = 'localhost:8080/disponibilidadProyecto/cambiarEstadoProgramaEstable';

  private urlEndPointVerEstadoBianual: string = 'localhost:8080/disponibilidadProyecto/verEstadoProyectoBianual';
  private urlEndPointVerEstadoBienestar: string = 'localhost:8080/disponibilidadProyecto/verEstadoProyectoBienestar';
  private urlEndPointVerEstadoEspecial: string = 'localhost:8080/disponibilidadProyecto/verEstadoProyectoEspecial';
  private urlEndPointVerEstadoEstable: string = 'localhost:8080/disponibilidadProyecto/verEstadoProgramaEstable';

  
  constructor(private http: HttpClient) { }

  cambiar(){
    return this.http.post(this.urlEndPointCambiarEstadoBianual,{});
}


}
