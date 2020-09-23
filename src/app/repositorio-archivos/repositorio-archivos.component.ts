import { Component, OnInit } from '@angular/core';
import { Repositorio } from './repositorio';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositorioArchivosService } from './repositorio-archivos.service';
import swal from 'sweetalert2';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-repositorio-archivos',
  templateUrl: './repositorio-archivos.component.html'
})
export class RepositorioArchivosComponent implements OnInit {

  private archivoSeleccionado: File;
  progreso: number = 0;
  repositorio: Repositorio = new Repositorio();
  repositorios: Repositorio[];

  constructor(private activatedRouter: ActivatedRoute, private router: Router,
    private repositorioArchivosService: RepositorioArchivosService, private authService: AuthService) { }

  ngOnInit() {
    this.repositorioArchivosService.getArchivos().subscribe(
      repositorios => this.repositorios = repositorios
    );
  }

  seleccionarArchivoRepo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    //swal.fire('Archivo seleccionado','Haga click ahora en "Subir Archivo"', 'success');
    this.subirArchivoRepo();
    swal.fire('Archivo seleccionado correctamente', 'Archivo subido con éxito a la plataforma', 'success');
  }

  subirArchivoRepo() {
    this.repositorioArchivosService.subirArchivoRepo(this.archivoSeleccionado)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.repositorio = response.repositorio as Repositorio;
          //swal.fire('El archivo se cargó correctamente','Archivo subido con éxito', 'success');
          this.router.navigate(['/elegir-proyecto']);
        }
      })
  }

  // eliminarArchivo(id:number): void {
  //   this.repositorioArchivosService.eliminarArchivo(id);
  // }

  eliminarArchivo(archivo:string): void {
    this.repositorioArchivosService.eliminarArchivo(archivo);
  }



}
