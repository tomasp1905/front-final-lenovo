import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';
import { VerProyectosAutorizadosService } from './ver-proyectos-autorizados.service';
import { ModalProgramaEstableAutorizadoService } from './detalle-programa-estable-autorizado/modal-programa-estable-autorizado.service';
import { ModalProyectoBienestarAutorizadoService } from './detalle-proyecto-bienestar-autorizado/modal-proyecto-bienestar-autorizado.service';
import { ModalProyectoBianualAutorizadoService } from './detalle-proyecto-bianual-autorizado/modal-proyecto-bianual-autorizado.service';
import { ModalProyectoEspecialAutorizadoService } from './detalle-proyecto-especial-autorizado/modal-proyecto-especial-autorizado.service';

@Component({
  selector: 'app-ver-proyectos-autorizados',
  templateUrl: './ver-proyectos-autorizados.component.html'
})
export class VerProyectosAutorizadosComponent implements OnInit {

  proyectosBianuales: ProyectoBianual[];
  programasEstables: ProgramaEstable[];
  proyectosBienestar: ProyectoBienestar[];
  proyectosEspeciales: ProyectoEspecial[];

  proyectoSeleccionadoBianual: ProyectoBianual;
  programaEstableSeleccionado: ProgramaEstable;
  proyectoBienestarSeleccionado:ProyectoBienestar;
  proyectoEspecialSeleccionado: ProyectoEspecial;

  constructor(private verProyectosAutorizadosService:VerProyectosAutorizadosService, private modalProgramaEstableAutorizadoService:ModalProgramaEstableAutorizadoService,
  private modalProyectoBianualAutorizadoService:ModalProyectoBianualAutorizadoService, private modalProyectoBienestarAutorizadoService:ModalProyectoBienestarAutorizadoService,
  private modalProyectoEspecialAutorizadoService:ModalProyectoEspecialAutorizadoService) { }

  ngOnInit() {
    this.verProyectosAutorizadosService.getProyectosBianuales().subscribe(
      proyectosBianuales => this.proyectosBianuales = proyectosBianuales
    );
    this.verProyectosAutorizadosService.getProgramasEstables().subscribe(
      programasEstables => this.programasEstables = programasEstables
    );
    this.verProyectosAutorizadosService.getProyectosBienestar().subscribe(
      proyectosBienestar => this.proyectosBienestar = proyectosBienestar
    );
    this.verProyectosAutorizadosService.getProyectosEspeciales().subscribe(
      proyectosEspeciales => this.proyectosEspeciales = proyectosEspeciales
    );
  }

  abrirModalEstable(programaEstable:ProgramaEstable){
    this.programaEstableSeleccionado = programaEstable;
    this.modalProgramaEstableAutorizadoService.abrirModal();
  }

  abrirModalBianual(proyecto: ProyectoBianual) {
    this.proyectoSeleccionadoBianual = proyecto;
    this.modalProyectoBianualAutorizadoService.abrirModal();
  }

  abrirModalBienestar(proyectoBienestar:ProyectoBienestar){
    this.proyectoBienestarSeleccionado = proyectoBienestar;
    this.modalProyectoBienestarAutorizadoService.abrirModal();
  }

  abrirModalEspecial(proyectoEspecial:ProyectoEspecial){
    this.proyectoEspecialSeleccionado = proyectoEspecial;
    this.modalProyectoEspecialAutorizadoService.abrirModal();
  }

  activarBianual(proyectoBianual: ProyectoBianual): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea activar el proyecto ${proyectoBianual.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, activar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoBianual.fechaDeInicio = new Date();
        this.verProyectosAutorizadosService.activarBianual(proyectoBianual.id).subscribe(
          response => {
            this.proyectosBianuales = this.proyectosBianuales.filter(pro => pro !== proyectoBianual)
            swalWithBootstrapButtons.fire(
              '¡Proyecto activado!',
              `Proyecto ${proyectoBianual.titulo} activado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }

  activarEstable(programaEstable: ProgramaEstable): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea activar el programa ${programaEstable.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, activar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        programaEstable.fechaDeInicio = new Date();
        this.verProyectosAutorizadosService.activarEstable(programaEstable.id).subscribe(
          response => {
            this.programasEstables = this.programasEstables.filter(pro => pro !== programaEstable)
            swalWithBootstrapButtons.fire(
              '¡Programa activado!',
              `Programa ${programaEstable.titulo} activado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }

  activarBienestar(proyectoBienestar: ProyectoBienestar): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea activar el proyecto ${proyectoBienestar.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, activar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoBienestar.fechaDeInicio = new Date();
        this.verProyectosAutorizadosService.activarBienestar(proyectoBienestar.id).subscribe(
          response => {
            this.proyectosBienestar = this.proyectosBienestar.filter(pro => pro !== proyectoBienestar)
            swalWithBootstrapButtons.fire(
              '¡Proyecto activado!',
              `Proyecto ${proyectoBienestar.titulo} activado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }

  activarEspecial(proyectoEspecial: ProyectoEspecial): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea activar el proyecto ${proyectoEspecial.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, activar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoEspecial.fechaDeInicio = new Date();
        this.verProyectosAutorizadosService.activarEspecial(proyectoEspecial.id).subscribe(
          response => {
            this.proyectosEspeciales = this.proyectosEspeciales.filter(pro => pro !== proyectoEspecial)
            swalWithBootstrapButtons.fire(
              '¡Proyecto activado!',
              `Proyecto ${proyectoEspecial.titulo} activado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }




}
