import { Component, OnInit } from '@angular/core';
import { ProgramaEstable } from '../programa-estable';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramaEstableService } from '../programa-estable.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rendicion-contable-estable',
  templateUrl: './rendicion-contable-estable.component.html'
})
export class RendicionContableEstableComponent implements OnInit {

  programaEstable: ProgramaEstable;
  titulo: string = "RENDICIÓN CONTABLE DEL PROGRAMA ESTABLE";

  private rendicionSeleccionada: File;
  progreso:number = 0;

  constructor(private activatedRouter: ActivatedRoute, private programaEstableService: ProgramaEstableService,
              private router: Router) { }

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

  seleccionarRendicion(event){
    this.rendicionSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.rendicionSeleccionada);
  }

  subirRendicion() {
    this.programaEstableService.subirRendicion(this.rendicionSeleccionada, this.programaEstable.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.programaEstable = response.programaEstable as ProgramaEstable;
        swal.fire('La rendicion contable se cargó correctamente','Archivo subido con éxito', 'success');
        this.router.navigate(['/ver-mis-proyectos']);
      }
    })
  }

}
