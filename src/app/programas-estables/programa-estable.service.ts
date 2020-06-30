import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Carrera } from '../proyectos-bianuales/listas/carrera';
import { Prioridad } from '../proyectos-bianuales/listas/prioridad';
import { ProgramaEstable } from './programa-estable';

@Injectable({
  providedIn: 'root'
})
export class ProgramaEstableService {
  //AUTOCOMPLETE
  private urlEndPointUnidadAcedemica: string = 'http://localhost:8080/unidadesAcademicas';
  private urlEndPointCarrera: string = 'http://localhost:8080/carreras';
  private urlEndPointPrioridades: string = 'http://localhost:8080/prioridades';

  //CREAR PROYECTO
  private urlEndPointCrearProyecto: string = 'http://localhost:8080/programaEstable/agregarNuevoPrograma';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private urlEndPointUpload: string = 'http://localhost:8080/programaEstable';
  private urlEndPointProgramaEstablePorId: string = 'http://localhost:8080/programaEstable/verProgramaEstable';

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


  getPrioridades():Observable<Prioridad[]>{
    return this.http.get<Prioridad[]>(`${this.urlEndPointPrioridades}/verPrioridades/`)
  }

  create(programaEstable: ProgramaEstable): Observable<ProgramaEstable> {
    return this.http.post<ProgramaEstable>(this.urlEndPointCrearProyecto, programaEstable, { headers: this.httpHeaders })
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

  getProgramaEstable(id):Observable<ProgramaEstable>{
    return this.http.get<ProgramaEstable>(`${this.urlEndPointProgramaEstablePorId}/${id}`)
  }


}
