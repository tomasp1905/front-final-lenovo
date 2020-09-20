import { Component, OnInit } from '@angular/core';
import { ProyectoBienestar } from '../proyecto-bienestar';
import { ProyectoBienestarService } from '../proyecto-bienestar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-presupuesto-bienestar',
  templateUrl: './presupuesto-bienestar.component.html'
})
export class PresupuestoBienestarComponent implements OnInit {

  private presupuestoSeleccionado: File;
  progreso:number = 0;
  proyectoBienestar: ProyectoBienestar;
  titulo: string = "PRESUPUESTO DEL PROYECTO";

  constructor(private proyectoBinestarService: ProyectoBienestarService,
  private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.proyectoBinestarService.getProyectoBienestar(id).subscribe(proyectoBienestar => {
          this.proyectoBienestar = proyectoBienestar;
        })
      }
    }
    );
  }


    seleccionarPresupuesto(event){
      this.presupuestoSeleccionado = event.target.files[0];
      this.progreso = 0;
      this.subirPresupuesto();
      swal.fire('Presupuesto seleccionado correctamente','Archivo subido con éxito', 'success');
      //console.log(this.presupuestoSeleccionado);
    }

    subirPresupuesto() {
      this.proyectoBinestarService.subirPresupuesto(this.presupuestoSeleccionado, this.proyectoBienestar.id)
      .subscribe(event =>{
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.proyectoBienestar = response.proyectoBienestar as ProyectoBienestar;
          //swal.fire('El presupuesto se cargó correctamente','Archivo subido con éxito', 'success');
          this.router.navigate(['/elegir-proyecto']);
        }
      })
    }

}
