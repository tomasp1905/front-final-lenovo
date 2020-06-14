import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerUsuarioService {

  private urlEndPointVerUsuariosAdmin: string = 'http://localhost:8080/usuario/verUsuariosAdmin';
  private urlEndPointVerUsuariosUser: string = 'http://localhost:8080/usuario/verUsuariosUser';
  private urlEndPointVerUsuariosVisit: string = 'http://localhost:8080/usuario/verUsuariosVisit';

  private urlEndPointEstablecerRolAdmin: string = 'http://localhost:8080/usuario/establecerRolAdmin';
  private urlEndPointEstablecerRolUser: string = 'http://localhost:8080/usuario/establecerRolUser';
  private urlEndPointEstablecerRolVisit: string = 'http://localhost:8080/usuario/establecerRolVisit';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private http: HttpClient) { }


  getUsuariosAdmin():Observable<Usuario[]>{
    return this.http.get(this.urlEndPointVerUsuariosAdmin).pipe(
      map(response =>{
        let usuariosAdmin = response as Usuario[];
        return usuariosAdmin;
      })
    )
  }

  getUsuariosUser():Observable<Usuario[]>{
    return this.http.get(this.urlEndPointVerUsuariosUser).pipe(
      map(response =>{
        let usuarios = response as Usuario[];
        return usuarios;
      })
    )
  }

  getUsuariosVisit():Observable<Usuario[]>{
    return this.http.get(this.urlEndPointVerUsuariosVisit).pipe(
      map(response =>{
        let usuarios = response as Usuario[];
        return usuarios;
      })
    )
  }

  establecerComoAdmin(id: number): Observable<Usuario>{
     return this.http.post<Usuario>(`${this.urlEndPointEstablecerRolAdmin}/${id}`,{headers: this.httpHeaders} )
  }

  establecerComoUser(id: number): Observable<Usuario>{
     return this.http.post<Usuario>(`${this.urlEndPointEstablecerRolUser}/${id}`,{headers: this.httpHeaders} )
  }

  establecerComoVisit(id: number): Observable<Usuario>{
     return this.http.post<Usuario>(`${this.urlEndPointEstablecerRolVisit}/${id}`,{headers: this.httpHeaders} )
  }

}
