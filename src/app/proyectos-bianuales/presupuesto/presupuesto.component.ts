 import { Component, OnInit } from '@angular/core';
import { ProyectoBianual } from '../proyecto-bianual';
import { ProyectoBianualService } from '../proyecto-bianual.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html'

})
export class PresupuestoComponent implements OnInit {

  private presupuestoSeleccionado: File;
  progreso:number = 0;
  proyectoBianual: ProyectoBianual;
  titulo: string = "PRESUPUESTO DEL PROYECTO";

  constructor(private proyectoBianualService: ProyectoBianualService,
    private activatedRouter: ActivatedRoute, private router: Router) { }

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

  seleccionarPresupuesto(event){
    this.presupuestoSeleccionado = event.target.files[0];
    this.progreso = 0;
    this.subirPresupuesto()
    swal.fire('Presupuesto seleccionado correctamente','Archivo subido con éxito', 'success');
    //console.log(this.presupuestoSeleccionado);
  }

  subirPresupuesto() {
    this.proyectoBianualService.subirPresupuesto(this.presupuestoSeleccionado, this.proyectoBianual.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.proyectoBianual = response.proyectoBianual as ProyectoBianual;
        //swal.fire('El presupuesto se cargó correctamente','Archivo subido con éxito', 'success');
        this.router.navigate(['/elegir-proyecto']);
      }
    })
  }

}
