import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Repositorio } from './repositorio';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositorioArchivosService {

  private urlEndPointUpload: string = 'http://localhost:8080/plantillas';
  private urlEndPointEliminar: string = 'http://localhost:8080/plantillas/uploads/arch';
  private urlEndPointVerArchivos: string = 'http://localhost:8080/plantillas/uploads/arch/verTodosLosArchivos';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router:Router) { }

  getArchivos():Observable<Repositorio[]>{
    return this.http.get(this.urlEndPointVerArchivos).pipe(
      map(response =>{
        let respositorios = response as Repositorio[];
        return respositorios;
      })
    )
  }

  subirArchivoRepo(archivo: File):Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    const req = new HttpRequest ('POST',`${this.urlEndPointUpload}/upload`,formData)
    return this.http.request(req);
  }

  eliminarArchivo(archivo:string){
    console.log("entro al servicio con el archivo "+ archivo)
    return this.http.delete(`${this.urlEndPointEliminar}/${archivo}`, {headers: this.httpHeaders})
  }




}
