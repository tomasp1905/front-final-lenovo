import { Component, OnInit, Input } from '@angular/core';
import { MisProyectosService } from './mis-proyectos.service';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ModalDetalleBianualMisProyectosService } from './detalle-bianual-mis-proyectos/modal-detalle-bianual-mis-proyectos.service';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';
import { ProyectoBianualService } from '../proyectos-bianuales/proyecto-bianual.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';




@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html'
})
export class MisProyectosComponent implements OnInit {

  proyectosBianuales: ProyectoBianual[];
  proyectosBienestar: ProyectoBienestar[];
  proyectosEspeciales: ProyectoEspecial[];

  proyectoSeleccionadoBianual: ProyectoBianual;
  proyectoSeleccionadoBienestar: ProyectoBienestar;
  proyectoSeleccionadoEspecial: ProyectoEspecial;

  private proyectoBianual: ProyectoBianual = new ProyectoBianual();

  constructor(private misProyectosService: MisProyectosService, private modalDetalleBianualMisProyectos: ModalDetalleBianualMisProyectosService,
              private proyectoBianualService: ProyectoBianualService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.misProyectosService.getProyectosBianuales().subscribe(
      proyectosBianuales => this.proyectosBianuales = proyectosBianuales
    );
    this.misProyectosService.getProyectosBienestar().subscribe(
      proyectosBienestar => this.proyectosBienestar = proyectosBienestar
    );
    this.misProyectosService.getProyectosEspeciales().subscribe(
      proyectosEspeciales => this.proyectosEspeciales = proyectosEspeciales
    );
  }

  abrirModalBianual(proyecto: ProyectoBianual) {
    this.proyectoSeleccionadoBianual = proyecto;
    this.modalDetalleBianualMisProyectos.abrirModal();
    console.log("click")
  }


  // updateBianual(proyecto: ProyectoBianual): void {
  //   this.misProyectosService.updateBianual(proyecto)
  //     .subscribe(json => {
  //       this.router.navigate(['/ver-mis-proyectos'])
  //       swal.fire('Proyecto actualizado', `El Proyecto ${proyecto.titulo} se actualizó con éxito`, 'success');
  //     }
  //     )
  // }




}
