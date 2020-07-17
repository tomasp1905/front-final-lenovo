import { Component, OnInit } from '@angular/core';
import { ProyectoEspecial } from '../proyecto-especial';
import { ProyectoEspecialService } from '../proyecto-especial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-presupuesto-especial',
  templateUrl: './presupuesto-especial.component.html'
})
export class PresupuestoEspecialComponent implements OnInit {

  private presupuestoSeleccionado: File;
  progreso:number = 0;
  titulo: string = "PRESUPUESTO DEL PROYECTO";

  proyectoEspecial: ProyectoEspecial;

  constructor(private proyectoEspecialService: ProyectoEspecialService,
  private activatedRouter: ActivatedRoute, private router: Router) { }

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

  seleccionarPresupuesto(event){
    this.presupuestoSeleccionado = event.target.files[0];
    this.progreso = 0;
    swal.fire('Presupuesto seleccionado','Haga click ahora en "Subir Archivo"', 'success');
    console.log(this.presupuestoSeleccionado);
  }

  subirPresupuesto() {
    this.proyectoEspecialService.subirPresupuesto(this.presupuestoSeleccionado, this.proyectoEspecial.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.proyectoEspecial = response.programaEstable as ProyectoEspecial;
        swal.fire('El presupuesto se cargó correctamente','Archivo subido con éxito', 'success');
        this.router.navigate(['/elegir-proyecto']);
      }
    })
  }


}
