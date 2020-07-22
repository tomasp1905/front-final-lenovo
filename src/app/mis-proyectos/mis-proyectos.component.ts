import { Component, OnInit, Input } from '@angular/core';
import { MisProyectosService } from './mis-proyectos.service';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ModalDetalleBianualMisProyectosService } from './detalle-bianual-mis-proyectos/modal-detalle-bianual-mis-proyectos.service';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';
import { ProyectoBianualService } from '../proyectos-bianuales/proyecto-bianual.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { AuthService } from '../usuarios/auth.service';
import { ModalDetalleEstableMisProyectosService } from './detalle-estable-mis-proyectos/modal-detalle-estable-mis-proyectos.service';
import { ModalDetalleBienestarMisProyectosService } from './detalle-bienestar-mis-proyectos/modal-detalle-bienestar-mis-proyectos.service';
import { ModalDetalleEspecialMisProyectosService } from './detalle-especial-mis-proyectos/modal-detalle-especial-mis-proyectos.service';




@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html'
})
export class MisProyectosComponent implements OnInit {

  proyectosBianuales: ProyectoBianual[];
  proyectosBienestar: ProyectoBienestar[];
  proyectosEspeciales: ProyectoEspecial[];
  programasEstables: ProgramaEstable[];

  proyectoSeleccionadoBianual: ProyectoBianual;
  proyectoSeleccionadoBienestar: ProyectoBienestar;
  proyectoSeleccionadoEspecial: ProyectoEspecial;
  programaSeleccionadoEstable: ProgramaEstable;

  private proyectoBianual: ProyectoBianual = new ProyectoBianual();

  constructor(private misProyectosService: MisProyectosService, private modalDetalleBianualMisProyectos: ModalDetalleBianualMisProyectosService,
              private proyectoBianualService: ProyectoBianualService, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService,
              private modalDetalleEstableMisProyectosService:ModalDetalleEstableMisProyectosService, private modalDetalleBienestarMisProyectosService:ModalDetalleBienestarMisProyectosService,
              private modalDetalleEspecialMisProyectosService:ModalDetalleEspecialMisProyectosService) { }

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
    this.misProyectosService.getProgramasEstables().subscribe(
      programasEstables => this.programasEstables = programasEstables
    );
  }

  abrirModalBianual(proyecto: ProyectoBianual) {
    this.proyectoSeleccionadoBianual = proyecto;
    this.modalDetalleBianualMisProyectos.abrirModal();
    // console.log("click")
  }

  abrirModalEstable(programaEstable: ProgramaEstable) {
    this.programaSeleccionadoEstable = programaEstable;
    this.modalDetalleEstableMisProyectosService.abrirModal();
    //console.log("click")
  }

  abrirModalBienestar(proyecto: ProyectoBienestar) {
    this.proyectoSeleccionadoBienestar = proyecto;
    this.modalDetalleBienestarMisProyectosService.abrirModal();
    //console.log("click")
  }

  abrirModalEspecial(proyecto: ProyectoEspecial) {
    this.proyectoSeleccionadoEspecial = proyecto;
    this.modalDetalleEspecialMisProyectosService.abrirModal();
    //console.log("click")
  }






}
