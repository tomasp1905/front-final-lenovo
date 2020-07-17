import { Component, OnInit } from '@angular/core';
import { ProyectoBianual } from '../proyecto-bianual';
import { ProyectoBianualService } from '../proyecto-bianual.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rendicion-contable',
  templateUrl: './rendicion-contable.component.html'
})
export class RendicionContableComponent implements OnInit {

  proyectoBianual: ProyectoBianual;
  titulo: string = "RENDICIÓN CONTABLE DEL PROYECTO BIANUAL";

  private rendicionSeleccionada: File;
  progreso:number = 0;


  constructor(private proyectoBianualService: ProyectoBianualService, private activatedRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.proyectoBianualService.getProyectoBianual(id).subscribe(proyectoBianual => {
          this.proyectoBianual = proyectoBianual;
        })
      }
    }
    );
  }

  seleccionarRendicion(event){
    this.rendicionSeleccionada = event.target.files[0];
    this.progreso = 0;
    swal.fire('Rendicion contable seleccionada','Haga click ahora en "Subir Archivo"', 'success');
    console.log(this.rendicionSeleccionada);
  }

  subirRendicion() {
    this.proyectoBianualService.subirRendicion(this.rendicionSeleccionada, this.proyectoBianual.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.proyectoBianual = response.proyectoBianual as ProyectoBianual;
        swal.fire('La rendicion contable se cargó correctamente','Archivo subido con éxito', 'success');
        this.router.navigate(['/ver-mis-proyectos']);
      }
    })
  }

}
