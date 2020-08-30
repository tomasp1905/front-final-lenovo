import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { FiltroPayload } from './objetos/filtroPayload';
import { Anio } from './objetos/anio';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private urlEndPointUnidadAcedemica: string = 'http://localhost:8080/unidadesAcademicas';
  private urlEndPointeEnviarFiltro: string = 'http://localhost:8080/filtros/filtrar';
  private urlEndPointAnios: string = 'http://localhost:8080/anios';

  constructor(private http: HttpClient, private router:Router) { }

  filtrarUnidadesAcademicas(term: string): Observable<UnidadAcademica[]> {
    return this.http.get<UnidadAcademica[]>(`${this.urlEndPointUnidadAcedemica}/filtrar-unidades/${term}`)
  }

  filtrarAnios(term:string): Observable<Anio[]> {
    return this.http.get<Anio[]>(`${this.urlEndPointAnios}/filtrar-anios/${term}`)
  }

  getAnios():Observable<Anio[]>{
    return this.http.get<Anio[]>(`${this.urlEndPointAnios}/getAnios`)
  }

  create(filtroPayload: FiltroPayload): Observable<FiltroPayload> {
    return this.http.post<FiltroPayload>(this.urlEndPointeEnviarFiltro, filtroPayload)
  }





}
