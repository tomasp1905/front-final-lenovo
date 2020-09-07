import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { FiltroPayload } from './objetos/filtroPayload';
import { Anio } from './objetos/anio';
import { ResultadoFiltro } from './objetos/ResultadoFiltro';
import { FiltroConResultado } from './objetos/FiltroConResultado';
import { saveAs } from 'file-saver';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private urlEndPointUnidadAcedemica: string = 'http://localhost:8080/unidadesAcademicas';
  private urlEndPointeEnviarFiltro: string = 'http://localhost:8080/filtros/filtrar';
  private urlEndPointGenerarPdf: string = 'http://localhost:8080/filtros/generarPDF';
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

  create(filtroPayload: FiltroPayload): Observable<ResultadoFiltro> {
    return this.http.post<ResultadoFiltro>(this.urlEndPointeEnviarFiltro, filtroPayload)
  }

  generatePdf(resultFilter: FiltroConResultado) {
    return this.http.post(this.urlEndPointGenerarPdf, resultFilter, { responseType: 'blob' })
  }

  

}
