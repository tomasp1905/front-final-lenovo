import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';



@Injectable({
  providedIn: 'root'
})
export class MisProyectosService {

  private urlEndPointObtenerProyectosBianuales: string = 'http://localhost:8080/usuario/obtenerProyectosBianualesPorDirector';
  private urlEndPointObtenerProyectosBienestar: string = 'http://localhost:8080/usuario/obtenerProyectosBienestarPorDirector';
  private urlEndPointObtenerProyectosEspeciales: string = 'http://localhost:8080/usuario/obtenerProyectosEspecialesPorDirector';

  private urlEndPointProyectoBianualPorId: string = 'http://localhost:8080/proyectoBianual/verProyecto';
  private urlEndPointModificarProyectoBianual: string = 'http://localhost:8080/proyectoBianual/modificarProyecto';


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getProyectosBianuales():Observable<ProyectoBianual[]>{
    return this.http.get(this.urlEndPointObtenerProyectosBianuales).pipe(
      map(response =>{
        let proyectosBianuales = response as ProyectoBianual[];
        return proyectosBianuales;
      })
    )
  }

  getProyectosBienestar():Observable<ProyectoBienestar[]>{
    return this.http.get(this.urlEndPointObtenerProyectosBienestar).pipe(
      map(response =>{
        let proyectosBienestar = response as ProyectoBienestar[];
        return proyectosBienestar;
      })
    )
  }

  getProyectosEspeciales():Observable<ProyectoEspecial[]>{
    return this.http.get(this.urlEndPointObtenerProyectosEspeciales).pipe(
      map(response =>{
        let proyectosEspeciales = response as ProyectoEspecial[];
        return proyectosEspeciales;
      })
    )
  }

  



}
