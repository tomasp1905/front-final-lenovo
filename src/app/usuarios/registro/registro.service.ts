import { Injectable } from '@angular/core';
import { Usuario } from '../usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadAcademica } from 'src/app/proyectos-bianuales/listas/unidad-academica';
import { Carrera } from 'src/app/proyectos-bianuales/listas/carrera';
import { Cargo } from './cargo';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlEndPointCrearUsuario: string = 'http://localhost:8080/usuario/agregarNuevoUsuario';

  private urlEndPointUnidadAcedemica: string = 'http://localhost:8080/unidadesAcademicas';
  private urlEndPointCarrera: string = 'http://localhost:8080/carreras';
  private urlEndPointCargo: string = 'http://localhost:8080/cargos';

  constructor(private http: HttpClient) { }


  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPointCrearUsuario, usuario, { headers: this.httpHeaders })
  }

  filtrarUnidadesAcademicas(term: string): Observable<UnidadAcademica[]> {
    return this.http.get<UnidadAcademica[]>(`${this.urlEndPointUnidadAcedemica}/filtrar-unidades/${term}`)
  }

  filtrarCarreras(term: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.urlEndPointCarrera}/filtrar-carreras/${term}`)
  }

  getCargos():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.urlEndPointCargo}/verCargos/`)
  }


}
