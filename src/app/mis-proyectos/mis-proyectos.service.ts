import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';


@Injectable({
  providedIn: 'root'
})
export class MisProyectosService {

  private urlEndPointObtenerProyectoBianuales: string = 'http://localhost:8080/usuario/obtenerProyectosBianualesPorDirector';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getProyectosBianuales():Observable<ProyectoBianual[]>{
    return this.http.get(this.urlEndPointObtenerProyectoBianuales).pipe(
      map(response =>{
        let proyectosBianuales = response as ProyectoBianual[];
        return proyectosBianuales;
      })
    )
  }

}
