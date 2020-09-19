import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { Observable } from 'rxjs';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';

@Injectable({
  providedIn: 'root'
})
export class ComentariosProyectosService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private urlEndPointComentariosBianual: string = 'http://localhost:8080/proyectoBianual/agregarComentario';
  private urlEndPointComentariosEstable: string = 'http://localhost:8080/programaEstable/agregarComentario';
  private urlEndPointComentariosBienestar: string = 'http://localhost:8080/proyectoBienestar/agregarComentario';
  private urlEndPointComentariosEspecial: string = 'http://localhost:8080/proyectoEspecial/agregarComentario';

  constructor(private http: HttpClient, private router:Router) { }

  updateComentarioBianualNoAutorizado(proyectoBianual: ProyectoBianual):Observable<ProyectoBianual>{
    return this.http.put<ProyectoBianual>(`${this.urlEndPointComentariosBianual}/${proyectoBianual.id}`,proyectoBianual)
  }

  updateComentarioEstableNoAutorizado(programaEstable: ProgramaEstable):Observable<ProgramaEstable>{
    return this.http.put<ProgramaEstable>(`${this.urlEndPointComentariosEstable}/${programaEstable.id}`,programaEstable)
  }

  updateComentarioBienestarNoAutorizado(proyectoBienestar: ProyectoBienestar):Observable<ProyectoBienestar>{
    return this.http.put<ProyectoBienestar>(`${this.urlEndPointComentariosBienestar}/${proyectoBienestar.id}`,proyectoBienestar)
  }

  updateComentarioEspecialNoAutorizado(proyectoEspecial: ProyectoEspecial):Observable<ProyectoEspecial>{
    return this.http.put<ProyectoEspecial>(`${this.urlEndPointComentariosEspecial}/${proyectoEspecial.id}`,proyectoEspecial)
  }




}
