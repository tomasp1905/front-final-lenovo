import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';

@Injectable({
  providedIn: 'root'
})
export class VerProyectoService {

  //VER PROYECTOS
  private urlEndPointVerProyectosBianuales: string = 'http://localhost:8080/proyectoBianual/verProyectosActivos';
  private urlEndPointVerProgramasEstables: string = 'http://localhost:8080/programaEstable/verProgramasEstableActivos';
  private urlEndPointVerProyectosBienestar: string = 'http://localhost:8080/proyectoBienestar/verProyectosActivos';
  private urlEndPointVerProyectosEspeciales: string = 'http://localhost:8080/proyectoEspecial/verProyectosActivos';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  // private httpHeaders2 = new HttpHeaders({'Content-Type': 'blob'})

  private urlEndPointProyectoBianualPorId: string = 'http://localhost:8080/proyectoBianual/verProyecto';
  private urlEndPointModificarProyectoBianual: string = 'http://localhost:8080/proyectoBianual/modificarProyecto';
  private urlEndPointFinalizarProyectoBianual: string = 'http://localhost:8080/proyectoBianual/finalizarProyecto';
  // private urlEndPointGenerarPDFBianual: string = 'http://localhost:8080/proyectoBianual/generarPDF'

  private urlEndPointProgramaEstablePorId: string = 'http://localhost:8080/programaEstable/verProgramaEstable';
  private urlEndPointModificarProgramaEstable: string = 'http://localhost:8080/programaEstable/modificarPrograma';
  private urlEndPointFinalizarProgramaEstable: string = 'http://localhost:8080/programaEstable/finalizarProgramaEstable';

  private urlEndPointProyectoBienestarPorId: string = 'http://localhost:8080/proyectoBienestar/verProyecto';
  private urlEndPointModificarProyectoBienestar: string = 'http://localhost:8080/proyectoBienestar/modificarProyecto';
  private urlEndPointFinalizarProyectoBienestar: string = 'http://localhost:8080/proyectoBienestar/finalizarProyecto';

  private urlEndPointProyectoEspecialPorId: string = 'http://localhost:8080/proyectoEspecial/verProyecto';
  private urlEndPointModificarProyectoEspecial: string = 'http://localhost:8080/proyectoEspecial/modificarProyecto';
  private urlEndPointFinalizarProyectoEspecial: string = 'http://localhost:8080/proyectoEspecial/finalizarProyecto';





  constructor(private http: HttpClient) { }

  getProyectosBianuales():Observable<ProyectoBianual[]>{
    return this.http.get(this.urlEndPointVerProyectosBianuales).pipe(
      map(response =>{
        let proyectosBianuales = response as ProyectoBianual[];
        return proyectosBianuales;
      })
    )
  }

  getProgramasEstables():Observable<ProgramaEstable[]>{
    return this.http.get(this.urlEndPointVerProgramasEstables).pipe(
      map(response =>{
        let programasEstables = response as ProgramaEstable[];
        return programasEstables;
      })
    )
  }

  getProyectosBienestar():Observable<ProyectoBienestar[]>{
    return this.http.get(this.urlEndPointVerProyectosBienestar).pipe(
      map(response =>{
        let proyectosBienestar = response as ProyectoBienestar[];
        return proyectosBienestar;
      })
    )
  }

  getProyectosEspeciales():Observable<ProyectoEspecial[]>{
    return this.http.get(this.urlEndPointVerProyectosEspeciales).pipe(
      map(response =>{
        let proyectosEspeciales = response as ProyectoEspecial[];
        return proyectosEspeciales;
      })
    )
  }

  //PROYECTO BIANUAL

  getProyectoBianual(id):Observable<ProyectoBianual>{
    return this.http.get<ProyectoBianual>(`${this.urlEndPointProyectoBianualPorId}/${id}`)
  }

  updateBianual(proyectoBianual: ProyectoBianual): Observable<ProyectoBianual>{
    return this.http.put<ProyectoBianual>(`${this.urlEndPointModificarProyectoBianual}/${proyectoBianual.id}`, proyectoBianual, {headers: this.httpHeaders})
  }

  finalizarBianual(id: number): Observable<ProyectoBianual>{
   return this.http.post<ProyectoBianual>(`${this.urlEndPointFinalizarProyectoBianual}/${id}`,{headers: this.httpHeaders} )
}

  // generarPDFBianual(id:number):Observable<ProyectoBianual>{
  //   return this.http.get<ProyectoBianual>(`${this.urlEndPointGenerarPDFBianual}/${id}`,{ headers: this.httpHeaders2})
  // }

//PROGRAMA ESTABLE

getProgramaEstable(id): Observable<ProgramaEstable>{
  return this.http.get<ProgramaEstable>(`${this.urlEndPointProgramaEstablePorId}/${id}`)
}

updateEstable(programaEstable: ProgramaEstable): Observable<ProgramaEstable>{
  return this.http.put<ProgramaEstable>(`${this.urlEndPointModificarProgramaEstable}/${programaEstable.id}`, programaEstable, {headers: this.httpHeaders})
}

finalizarEstable(id: number): Observable<ProgramaEstable>{
 return this.http.post<ProgramaEstable>(`${this.urlEndPointFinalizarProgramaEstable}/${id}`,{headers: this.httpHeaders} )
}

//PROYECTO BIENESTAR

getProyectoBienestar(id): Observable<ProyectoBienestar>{
  return this.http.get<ProyectoBienestar>(`${this.urlEndPointProyectoBienestarPorId}/${id}`)
}

updateBienestar(proyectoBienestar: ProyectoBienestar): Observable<ProyectoBienestar>{
  return this.http.put<ProyectoBienestar>(`${this.urlEndPointModificarProyectoBienestar}/${proyectoBienestar.id}`, proyectoBienestar, {headers: this.httpHeaders})
}

finalizarBienestar(id: number): Observable<ProyectoBienestar>{
 return this.http.post<ProyectoBienestar>(`${this.urlEndPointFinalizarProyectoBienestar}/${id}`,{headers: this.httpHeaders} )
}

//PROYECTO especial

getProyectoEspecial(id): Observable<ProyectoEspecial>{
  return this.http.get<ProyectoEspecial>(`${this.urlEndPointProyectoEspecialPorId}/${id}`)
}

updateEspecial(proyectoEspecial: ProyectoEspecial): Observable<ProyectoEspecial>{
  return this.http.put<ProyectoEspecial>(`${this.urlEndPointModificarProyectoEspecial}/${proyectoEspecial.id}`, proyectoEspecial, {headers: this.httpHeaders})
}

finalizarEspecial(id: number): Observable<ProyectoEspecial>{
 return this.http.post<ProyectoEspecial>(`${this.urlEndPointFinalizarProyectoEspecial}/${id}`,{headers: this.httpHeaders} )
}



}
