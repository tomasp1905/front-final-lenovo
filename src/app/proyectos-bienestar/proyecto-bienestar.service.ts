import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tematica } from './lista/tematica';
import { ProyectoBienestar } from './proyecto-bienestar';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Carrera } from '../proyectos-bianuales/listas/carrera';
import { Prioridad } from '../proyectos-bianuales/listas/prioridad';
import { ProgramaEstable } from '../programas-estables/programa-estable';

@Injectable({
  providedIn: 'root'
})
export class ProyectoBienestarService {

  // AUTOCOMPLETE
  private urlEndPointUnidadAcedemica: string = 'http://localhost:8080/unidadesAcademicas';
  private urlEndPointCarrera: string = 'http://localhost:8080/carreras';
  private urlEndPointPrioridades: string = 'http://localhost:8080/prioridades';
  private urlEndPointTematica: string = 'http://localhost:8080/tematicas';

  //CREAR PROYECTO
  private urlEndPointCrearProyecto: string = 'http://localhost:8080/proyectoBienestar/agregarNuevoProyecto';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private urlEndPointUpload: string = 'http://localhost:8080/proyectoBienestar';
  private urlEndPointProyectoBienestarPorId: string = 'http://localhost:8080/proyectoBienestar/verProyecto';

  constructor(private http: HttpClient) { }

  filtrarUnidadesAcademicas(term: string): Observable<UnidadAcademica[]> {
    return this.http.get<UnidadAcademica[]>(`${this.urlEndPointUnidadAcedemica}/filtrar-unidades/${term}`)
  }

  filtrarCarreras(term: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.urlEndPointCarrera}/filtrar-carreras/${term}`)
  }

  filtrarPrioridades(term:string): Observable<Prioridad[]> {
    return this.http.get<Prioridad[]>(`${this.urlEndPointPrioridades}/filtrar-prioridades/${term}`)
  }


  filtrarTematicas(term:string): Observable<Tematica[]> {
    return this.http.get<Tematica[]>(`${this.urlEndPointTematica}/filtrar-tematicas/${term}`)
  }

  getTematicas():Observable<Tematica[]>{
    return this.http.get<Tematica[]>(`${this.urlEndPointTematica}/verTematicas/`)
  }

  create(proyectoBienestar: ProyectoBienestar): Observable<ProyectoBienestar> {
    return this.http.post<ProyectoBienestar>(this.urlEndPointCrearProyecto, proyectoBienestar, { headers: this.httpHeaders })
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

  getProyectoBienestar(id):Observable<ProyectoBienestar>{
    return this.http.get<ProyectoBienestar>(`${this.urlEndPointProyectoBienestarPorId}/${id}`)
  }

}
