import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Observable } from 'rxjs';
import { Carrera } from '../proyectos-bianuales/listas/carrera';
import { ProyectoEspecial } from './proyecto-especial';

@Injectable({
  providedIn: 'root'
})
export class ProyectoEspecialService {

  //AUTOCOMPLETE
  private urlEndPointUnidadAcedemica: string = 'http://localhost:8080/unidadesAcademicas';
  private urlEndPointCarrera: string = 'http://localhost:8080/carreras';

  //CREAR PROYECTO
  private urlEndPointCrearProyecto: string = 'http://localhost:8080/proyectoEspecial/agregarNuevoProyecto';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private urlEndPointUpload: string = 'http://localhost:8080/proyectoEspecial';
  private urlEndPointProyectoEspecialPorId: string = 'http://localhost:8080/proyectoEspecial/verProyecto';
  private urlEndPointModificarProyectoEspecial: string = 'http://localhost:8080/proyectoEspecial/modificarProyecto';

  constructor(private http: HttpClient) { }

  filtrarUnidadesAcademicas(term: string): Observable<UnidadAcademica[]> {
    return this.http.get<UnidadAcademica[]>(`${this.urlEndPointUnidadAcedemica}/filtrar-unidades/${term}`)
  }

  filtrarCarreras(term: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.urlEndPointCarrera}/filtrar-carreras/${term}`)
  }


  create(proyectoEspecial: ProyectoEspecial): Observable<ProyectoEspecial> {
    return this.http.post<ProyectoEspecial>(this.urlEndPointCrearProyecto, proyectoEspecial, { headers: this.httpHeaders })
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

  getProyectoEspecial(id):Observable<ProyectoEspecial>{
    return this.http.get<ProyectoEspecial>(`${this.urlEndPointProyectoEspecialPorId}/${id}`)
  }

  update(proyectoEspecial: ProyectoEspecial):Observable<ProyectoEspecial>{
    return this.http.put<ProyectoEspecial>(`${this.urlEndPointModificarProyectoEspecial}/${proyectoEspecial.id}`,proyectoEspecial, {headers: this.httpHeaders})
  }

}
