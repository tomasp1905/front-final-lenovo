import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';

@Injectable({
  providedIn: 'root'
})
export class VerProyectosAutorizadosService {

  private urlEndPointVerProyectosBianualesAutorizados: string = 'http://localhost:8080/proyectoBianual/verProyectosAutorizados';
  private urlEndPointVerProgramasEstablesAutorizados: string = 'http://localhost:8080/programaEstable/verProgramasEstablesAutorizados';
  private urlEndPointVerProyectosBienestarAutorizados: string = 'http://localhost:8080/proyectoBienestar/verProyectosAutorizados';
  private urlEndPointVerProyectosEspecialesAutorizados: string = 'http://localhost:8080/proyectoEspecial/verProyectosAutorizados';

  private urlEndPointActivarProyectoBianual: string = 'http://localhost:8080/proyectoBianual/iniciarProyecto';
  private urlEndPointActivarProgramaEstable: string = 'http://localhost:8080/programaEstable/iniciarProgramaEstable';
  private urlEndPointActivarProyectoBienestar: string = 'http://localhost:8080/proyectoBienestar/iniciarProyecto';
  private urlEndPointActivarProyectoEspecial: string = 'http://localhost:8080/proyectoEspecial/iniciarProyecto';

    private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getProyectosBianuales():Observable<ProyectoBianual[]>{
    return this.http.get(this.urlEndPointVerProyectosBianualesAutorizados).pipe(
      map(response =>{
        let proyectosBianuales = response as ProyectoBianual[];
        return proyectosBianuales;
      })
    )
  }

  getProgramasEstables():Observable<ProgramaEstable[]>{
    return this.http.get(this.urlEndPointVerProgramasEstablesAutorizados).pipe(
      map(response =>{
        let programasEstables = response as ProgramaEstable[];
        return programasEstables;
      })
    )
  }

  getProyectosBienestar():Observable<ProyectoBienestar[]>{
    return this.http.get(this.urlEndPointVerProyectosBienestarAutorizados).pipe(
      map(response =>{
        let proyectosBienestar = response as ProyectoBienestar[];
        return proyectosBienestar;
      })
    )
  }

  getProyectosEspeciales():Observable<ProyectoEspecial[]>{
    return this.http.get(this.urlEndPointVerProyectosEspecialesAutorizados).pipe(
      map(response =>{
        let proyectosEspeciales = response as ProyectoEspecial[];
        return proyectosEspeciales;
      })
    )
  }


activarBianual(id: number): Observable<ProyectoBianual>{
   return this.http.post<ProyectoBianual>(`${this.urlEndPointActivarProyectoBianual}/${id}`,{headers: this.httpHeaders} )
}

activarEstable(id: number): Observable<ProgramaEstable>{
 return this.http.post<ProgramaEstable>(`${this.urlEndPointActivarProgramaEstable}/${id}`,{headers: this.httpHeaders} )
}

activarBienestar(id: number): Observable<ProyectoBienestar>{
 return this.http.post<ProyectoBienestar>(`${this.urlEndPointActivarProyectoBienestar}/${id}`,{headers: this.httpHeaders} )
}

activarEspecial(id: number): Observable<ProyectoEspecial>{
 return this.http.post<ProyectoEspecial>(`${this.urlEndPointActivarProyectoEspecial}/${id}`,{headers: this.httpHeaders} )
}


}
