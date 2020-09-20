import { Component, OnInit } from '@angular/core';
import { ProyectoEspecial } from '../proyecto-especial';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoEspecialService } from '../proyecto-especial.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rendicion-contable-especial',
  templateUrl: './rendicion-contable-especial.component.html'
})
export class RendicionContableEspecialComponent implements OnInit {

  proyectoEspecial: ProyectoEspecial;
  titulo: string = "RENDICIÓN CONTABLE DEL PROYECTO ESPECIAL";

  private rendicionSeleccionada: File;
  progreso:number = 0;

  constructor(private activatedRouter: ActivatedRoute, private proyectoEspecialService: ProyectoEspecialService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.proyectoEspecialService.getProyectoEspecial(id).subscribe(proyectoEspecial => {
          this.proyectoEspecial = proyectoEspecial;
        })
      }
    }
    );
  }

  seleccionarRendicion(event){
    this.rendicionSeleccionada = event.target.files[0];
    this.progreso = 0;
    this.subirRendicion();
    swal.fire('Rendicion contable seleccionada correctamente','Archivo subido con éxito', 'success');
    //console.log(this.rendicionSeleccionada);
  }

  subirRendicion() {
    this.proyectoEspecialService.subirRendicion(this.rendicionSeleccionada, this.proyectoEspecial.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.proyectoEspecial = response.proyectoEspecial as ProyectoEspecial;
        //swal.fire('La rendicion contable se cargó correctamente','Archivo subido con éxito', 'success');
        this.router.navigate(['/ver-mis-proyectos']);
      }
    })
  }

}
