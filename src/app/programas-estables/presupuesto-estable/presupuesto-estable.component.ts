import { Component, OnInit } from '@angular/core';
import { ProgramaEstable } from '../programa-estable';
import { ProgramaEstableService } from '../programa-estable.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-presupuesto-estable',
  templateUrl: './presupuesto-estable.component.html'
})
export class PresupuestoEstableComponent implements OnInit {

  programaEstable:ProgramaEstable;

  private presupuestoSeleccionado: File;
  progreso:number = 0;
  titulo: string = "PRESUPUESTO DEL PROGRAMA";

  constructor(private programaEstableService: ProgramaEstableService,
              private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.programaEstableService.getProgramaEstable(id).subscribe(programaEstable => {
          this.programaEstable = programaEstable;
        })
      }
    }
    );
  }

  seleccionarPresupuesto(event){
    this.presupuestoSeleccionado = event.target.files[0];
    this.progreso = 0;
    swal.fire('Presupuesto seleccionado','Haga click ahora en "Subir Archivo"', 'success');
    //console.log(this.presupuestoSeleccionado);
  }

  subirPresupuesto() {
    this.programaEstableService.subirPresupuesto(this.presupuestoSeleccionado, this.programaEstable.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.programaEstable = response.programaEstable as ProgramaEstable;
        swal.fire('El presupuesto se cargó correctamente','Archivo subido con éxito', 'success');
        this.router.navigate(['/elegir-proyecto']);
      }
    })
  }

}
