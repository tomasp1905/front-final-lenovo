import { Component, OnInit } from '@angular/core';
import { ProyectoBienestar } from '../proyecto-bienestar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoBienestarService } from '../proyecto-bienestar.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rendicion-contable-bienestar',
  templateUrl: './rendicion-contable-bienestar.component.html'
})
export class RendicionContableBienestarComponent implements OnInit {

  proyectoBienestar: ProyectoBienestar;
  titulo: string = "RENDICIÓN CONTABLE DEL PROYECTO BIENESTAR";

  private rendicionSeleccionada: File;
  progreso:number = 0;

  constructor(private activatedRouter: ActivatedRoute, private proyectoBienestarService: ProyectoBienestarService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.proyectoBienestarService.getProyectoBienestar(id).subscribe(proyectoBienestar => {
          this.proyectoBienestar = proyectoBienestar;
        })
      }
    }
    );
  }

  seleccionarRendicion(event){
    this.rendicionSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.rendicionSeleccionada);
  }

  subirRendicion() {
    this.proyectoBienestarService.subirRendicion(this.rendicionSeleccionada, this.proyectoBienestar.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.proyectoBienestar = response.proyectoBienestar as ProyectoBienestar;
        swal.fire('La rendicion contable se cargó correctamente','Archivo subido con éxito', 'success');
        this.router.navigate(['/ver-mis-proyectos']);
      }
    })
  }

}
