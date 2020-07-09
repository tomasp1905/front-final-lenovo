import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { UnidadAcademica } from './listas/unidad-academica';
import { ProyectoBianual } from './proyecto-bianual';
import { Carrera } from './listas/carrera';
import { Prioridad } from './listas/prioridad';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProyectoBianualService {
  //AUTOCOMPLETE
  private urlEndPointUnidadAcedemica: string = 'http://localhost:8080/unidadesAcademicas';
  private urlEndPointCarrera: string = 'http://localhost:8080/carreras';
  private urlEndPointPrioridades: string = 'http://localhost:8080/prioridades';

  //CREAR PROYECTO
  private urlEndPointCrearProyecto: string = 'http://localhost:8080/proyectoBianual/agregarNuevoProyecto';

  private urlEndPointUpload: string = 'http://localhost:8080/proyectoBianual';
  private urlEndPointProyectoBianualPorId: string = 'http://localhost:8080/proyectoBianual/verProyecto';
  private urlEndPointModificarProyectoBianual: string = 'http://localhost:8080/proyectoBianual/modificarProyecto';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient, private router:Router) { }



  filtrarUnidadesAcademicas(term: string): Observable<UnidadAcademica[]> {
    return this.http.get<UnidadAcademica[]>(`${this.urlEndPointUnidadAcedemica}/filtrar-unidades/${term}`)
  }

  filtrarCarreras(term: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.urlEndPointCarrera}/filtrar-carreras/${term}`)
  }


  filtrarPrioridades(term:string): Observable<Prioridad[]> {
    return this.http.get<Prioridad[]>(`${this.urlEndPointPrioridades}/filtrar-prioridades/${term}`)
  }


  getPrioridades():Observable<Prioridad[]>{
    return this.http.get<Prioridad[]>(`${this.urlEndPointPrioridades}/verPrioridades/`)
  }

  create(proyectoBianual: ProyectoBianual): Observable<ProyectoBianual> {
    return this.http.post<ProyectoBianual>(this.urlEndPointCrearProyecto, proyectoBianual)
    .pipe (
    catchError(e => {
      if(e.status==400){
        return throwError(e);
      }
      if(e.error.mensaje) {
      console.error(e.error.mensaje);
      }
      return throwError(e);
    }));
  }

  subirPresupuesto(archivo: File,id):Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id",id);

    const req = new HttpRequest ('POST',`${this.urlEndPointUpload}/upload`,formData)

    return this.http.request(req);

  }

  subirRendicion(archivo: File,id):Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id",id);

    const req = new HttpRequest ('POST',`${this.urlEndPointUpload}/uploadRendicionContable`,formData)

    return this.http.request(req);

  }

  getProyectoBianual(id):Observable<ProyectoBianual>{
    return this.http.get<ProyectoBianual>(`${this.urlEndPointProyectoBianualPorId}/${id}`)
  }

  update(proyectoBianual: ProyectoBianual):Observable<ProyectoBianual>{
    return this.http.put<ProyectoBianual>(`${this.urlEndPointModificarProyectoBianual}/${proyectoBianual.id}`,proyectoBianual, {headers: this.httpHeaders})
  }

}
