import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';

@Injectable({
  providedIn: 'root'
})
export class VerProyectosNoAutorizadosService {


  private urlEndPointVerProyectosBianualesNoAutorizados: string = 'http://localhost:8080/proyectoBianual/verProyectosNoAutorizados';
  private urlEndPointVerProgramasEstablesNoAutorizados: string = 'http://localhost:8080/programaEstable/verProgramasEstablesNoAutorizados';
  private urlEndPointVerProyectosBienestarNoAutorizados: string = 'http://localhost:8080/proyectoBienestar/verProyectosNoAutorizados';
  private urlEndPointVerProyectosEspecialesNoAutorizados: string = 'http://localhost:8080/proyectoEspecial/verProyectosNoAutorizados';

  private urlEndPointAutorizarProyectoBianual: string = 'http://localhost:8080/proyectoBianual/autorizarProyecto';
  private urlEndPointAutorizarProgramaEstable: string = 'http://localhost:8080/programaEstable/autorizarProgramaEstable';
  private urlEndPointAutorizarProyectoBienestar: string = 'http://localhost:8080/proyectoBienestar/autorizarProyecto';
  private urlEndPointAutorizarProyectoEspecial: string = 'http://localhost:8080/proyectoEspecial/autorizarProyecto';


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }


  getProyectosBianuales(): Observable<ProyectoBianual[]> {
    return this.http.get(this.urlEndPointVerProyectosBianualesNoAutorizados).pipe(
      map(response => {
        let proyectosBianuales = response as ProyectoBianual[];
        return proyectosBianuales;
      })
    )
  }

  getProgramasEstables(): Observable<ProgramaEstable[]> {
    return this.http.get(this.urlEndPointVerProgramasEstablesNoAutorizados).pipe(
      map(response => {
        let programasEstables = response as ProgramaEstable[];
        return programasEstables;
      })
    )
  }

  getProyectosBienestar(): Observable<ProyectoBienestar[]> {
    return this.http.get(this.urlEndPointVerProyectosBienestarNoAutorizados).pipe(
      map(response => {
        let proyectosBienestar = response as ProyectoBienestar[];
        return proyectosBienestar;
      })
    )
  }

  getProyectosEspeciales(): Observable<ProyectoEspecial[]> {
    return this.http.get(this.urlEndPointVerProyectosEspecialesNoAutorizados).pipe(
      map(response => {
        let proyectosEspeciales = response as ProyectoEspecial[];
        return proyectosEspeciales;
      })
    )
  }

  //AUTORIZACIONES

  autorizarBianual(id: number): Observable<ProyectoBianual> {
    return this.http.post<ProyectoBianual>(`${this.urlEndPointAutorizarProyectoBianual}/${id}`, { headers: this.httpHeaders })
  }

  autorizarEstable(id: number): Observable<ProgramaEstable> {
    return this.http.post<ProgramaEstable>(`${this.urlEndPointAutorizarProgramaEstable}/${id}`, { headers: this.httpHeaders })
  }

  autorizarBienestar(id: number): Observable<ProyectoBienestar> {
    return this.http.post<ProyectoBienestar>(`${this.urlEndPointAutorizarProyectoBienestar}/${id}`, { headers: this.httpHeaders })
  }

  autorizarEspecial(id: number): Observable<ProyectoEspecial> {
    return this.http.post<ProyectoEspecial>(`${this.urlEndPointAutorizarProyectoEspecial}/${id}`, { headers: this.httpHeaders })
  }


}
