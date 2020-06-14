import { Component, OnInit } from '@angular/core';
import { VerProyectoFinalizadoService } from './ver-proyecto-finalizado.service';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { ModalBianualService } from './detalle-proyecto-bianual-finalizado/modal-service-bianual.service';
import { ModalProgramaEstableFinalizadoService } from './detalle-programa-estable-finalizado/modal-programa-estable-finalizado.service';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ModalProyectoBienestarFinalizadoService } from './detalle-proyecto-bienestar-finalizado/modal-proyecto-bienestar-finalizado.service';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';
import { ModalProyectoEspecialFinalizadoService } from './detalle-proyecto-especial-finalizado/modal-proyecto-especial-finalizado.service';


@Component({
  selector: 'app-ver-proyectos-finalizados',
  templateUrl: './ver-proyectos-finalizados.component.html'
})
export class VerProyectosFinalizadosComponent implements OnInit {

  proyectosBianuales: ProyectoBianual[];
  programasEstables: ProgramaEstable[];
  proyectosBienestar: ProyectoBienestar[];
  proyectosEspeciales: ProyectoEspecial[];

  proyectoSeleccionadoBianual: ProyectoBianual;
  programaEstableSeleccionado: ProgramaEstable;
  proyectoBienestarSeleccionado:ProyectoBienestar;
  proyectoEspecialSeleccionado: ProyectoEspecial;



  constructor(private verProyectoFinalizadoService: VerProyectoFinalizadoService, private modalBianualService: ModalBianualService,
  private modalProgramaEstableFinalizadoService: ModalProgramaEstableFinalizadoService, private modalProyectoBienestarFinalizadoService:ModalProyectoBienestarFinalizadoService,
  private modalProyectoEspecialFinalizadoService:ModalProyectoEspecialFinalizadoService) { }

  ngOnInit() {
    this.verProyectoFinalizadoService.getProyectosBianuales().subscribe(
      proyectosBianuales => this.proyectosBianuales = proyectosBianuales
    );
    this.verProyectoFinalizadoService.getProgramasEstables().subscribe(
      programasEstables => this.programasEstables = programasEstables
    );
    this.verProyectoFinalizadoService.getProyectosBienestar().subscribe(
      proyectosBienestar => this.proyectosBienestar = proyectosBienestar
    );
    this.verProyectoFinalizadoService.getProyectosEspeciales().subscribe(
      proyectosEspeciales => this.proyectosEspeciales = proyectosEspeciales
    );

  }

  abrirModalBianual(proyecto: ProyectoBianual) {
    this.proyectoSeleccionadoBianual = proyecto;
    this.modalBianualService.abrirModal();
  }

  abrirModalEstable(programaEstable:ProgramaEstable){
    this.programaEstableSeleccionado = programaEstable;
    this.modalProgramaEstableFinalizadoService.abrirModal();
  }

  abrirModalBienestar(proyectoBienestar:ProyectoBienestar){
    this.proyectoBienestarSeleccionado = proyectoBienestar;
    this.modalProyectoBienestarFinalizadoService.abrirModal();
  }

  abrirModalEspecial(proyectoEspecial:ProyectoEspecial){
    this.proyectoEspecialSeleccionado = proyectoEspecial;
    this.modalProyectoEspecialFinalizadoService.abrirModal();
  }




}
