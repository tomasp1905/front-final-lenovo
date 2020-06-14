import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { map } from 'rxjs/operators';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';

@Injectable({
  providedIn: 'root'
})
export class VerProyectoFinalizadoService {


  private urlEndPointVerProyectosBianualesInactivos: string = 'http://localhost:8080/proyectoBianual/verProyectosFinalizados';
  private urlEndPointVerProgramasEstablesInactivos: string = 'http://localhost:8080/programaEstable/verProgramasEstablesFinalizados';
  private urlEndPointVerProyectosBienestarInactivos: string = 'http://localhost:8080/proyectoBienestar/verProyectosFinalizados';
  private urlEndPointVerProyectosEspecialesInactivos: string = 'http://localhost:8080/proyectoEspecial/verProyectosFinalizados';


  constructor(private http: HttpClient) { }

  getProyectosBianuales():Observable<ProyectoBianual[]>{
    return this.http.get(this.urlEndPointVerProyectosBianualesInactivos).pipe(
      map(response =>{
        let proyectosBianuales = response as ProyectoBianual[];
        return proyectosBianuales;
      })
    )
  }

  getProgramasEstables():Observable<ProgramaEstable[]>{
    return this.http.get(this.urlEndPointVerProgramasEstablesInactivos).pipe(
      map(response =>{
        let programasEstables = response as ProgramaEstable[];
        return programasEstables;
      })
    )
  }

  getProyectosBienestar():Observable<ProyectoBienestar[]>{
    return this.http.get(this.urlEndPointVerProyectosBienestarInactivos).pipe(
      map(response =>{
        let proyectosBienestar = response as ProyectoBienestar[];
        return proyectosBienestar;
      })
    )
  }

  getProyectosEspeciales():Observable<ProyectoEspecial[]>{
    return this.http.get(this.urlEndPointVerProyectosEspecialesInactivos).pipe(
      map(response =>{
        let proyectosEspeciales = response as ProyectoEspecial[];
        return proyectosEspeciales;
      })
    )
  }

}
