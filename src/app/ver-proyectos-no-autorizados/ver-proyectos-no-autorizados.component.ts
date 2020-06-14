import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';
import { VerProyectosNoAutorizadosService } from './ver-proyectos-no-autorizados.service';
import { ModalProgramaEstableNoAutorizadoService } from './detalle-programa-estable-no-autorizado/modal-programa-estable-no-autorizado.service';
import { ModalProyectoBianualNoAutorizadoService } from './detalle-proyecto-bianual-no-autorizado/modal-proyecto-bianual-no-autorizado.service';
import { ModalProyectoEspecialNoAutorizadoService } from './detalle-proyecto-especial-no-autorizado/modal-proyecto-especial-no-autorizado.service';
import { ModalProyectoBienestarNoAutorizadoService } from './detalle-proyecto-bienestar-no-autorizado/modal-proyecto-bienestar-no-autorizado.service';

@Component({
  selector: 'app-ver-proyectos-no-autorizados',
  templateUrl: './ver-proyectos-no-autorizados.component.html'
})
export class VerProyectosNoAutorizadosComponent implements OnInit {

  proyectosBianuales: ProyectoBianual[];
  programasEstables: ProgramaEstable[];
  proyectosBienestar: ProyectoBienestar[];
  proyectosEspeciales: ProyectoEspecial[];

  proyectoSeleccionadoBianual: ProyectoBianual;
  programaEstableSeleccionado: ProgramaEstable;
  proyectoBienestarSeleccionado: ProyectoBienestar;
  proyectoEspecialSeleccionado: ProyectoEspecial;


  constructor(private verProyectosNoAutorizadosService: VerProyectosNoAutorizadosService, private modalProgramaEstableNoAutorizadoService: ModalProgramaEstableNoAutorizadoService,
    private modalProyectoBianualNoAutorizadoService: ModalProyectoBianualNoAutorizadoService, private modalProyectoBienestarNoAutorizadoService: ModalProyectoBienestarNoAutorizadoService,
    private modalProyectoEspecialNoAutorizadoService: ModalProyectoEspecialNoAutorizadoService) { }

  ngOnInit() {
    this.verProyectosNoAutorizadosService.getProyectosBianuales().subscribe(
      proyectosBianuales => this.proyectosBianuales = proyectosBianuales
    );
    this.verProyectosNoAutorizadosService.getProgramasEstables().subscribe(
      programasEstables => this.programasEstables = programasEstables
    );
    this.verProyectosNoAutorizadosService.getProyectosBienestar().subscribe(
      proyectosBienestar => this.proyectosBienestar = proyectosBienestar
    );
    this.verProyectosNoAutorizadosService.getProyectosEspeciales().subscribe(
      proyectosEspeciales => this.proyectosEspeciales = proyectosEspeciales
    );
  }

  abrirModalEstable(programaEstable: ProgramaEstable) {
    this.programaEstableSeleccionado = programaEstable;
    this.modalProgramaEstableNoAutorizadoService.abrirModal();
  }

  abrirModalBianual(proyecto: ProyectoBianual) {
    this.proyectoSeleccionadoBianual = proyecto;
    this.modalProyectoBianualNoAutorizadoService.abrirModal();
  }

  abrirModalBienestar(proyectoBienestar: ProyectoBienestar) {
    this.proyectoBienestarSeleccionado = proyectoBienestar;
    this.modalProyectoBienestarNoAutorizadoService.abrirModal();
  }

  abrirModalEspecial(proyectoEspecial: ProyectoEspecial) {
    this.proyectoEspecialSeleccionado = proyectoEspecial;
    this.modalProyectoEspecialNoAutorizadoService.abrirModal();
  }

  autorizarBianual(proyectoBianual: ProyectoBianual): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea autorizar el proyecto ${proyectoBianual.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, autorizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoBianual.fechaDeAutorizacion = new Date();
        this.verProyectosNoAutorizadosService.autorizarBianual(proyectoBianual.id).subscribe(
          response => {
            this.proyectosBianuales = this.proyectosBianuales.filter(pro => pro !== proyectoBianual)
            swalWithBootstrapButtons.fire(
              'Proyecto autorizado!',
              `Proyecto ${proyectoBianual.titulo} autorizado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }

  autorizarEstable(programaEstable: ProgramaEstable): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea autorizar el programa ${programaEstable.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, autorizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        programaEstable.fechaDeAutorizacion = new Date();
        this.verProyectosNoAutorizadosService.autorizarEstable(programaEstable.id).subscribe(
          response => {
            this.programasEstables = this.programasEstables.filter(pro => pro !== programaEstable)
            swalWithBootstrapButtons.fire(
              'Programa autorizado!',
              `Programa ${programaEstable.titulo} autorizado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }

  autorizarBienestar(proyectoBienestar: ProyectoBienestar): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea autorizar el proyecto ${proyectoBienestar.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, autorizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoBienestar.fechaDeAutorizacion = new Date();
        this.verProyectosNoAutorizadosService.autorizarBienestar(proyectoBienestar.id).subscribe(
          response => {
            this.proyectosBienestar = this.proyectosBienestar.filter(pro => pro !== proyectoBienestar)
            swalWithBootstrapButtons.fire(
              'Proyecto autorizado!',
              `Proyecto ${proyectoBienestar.titulo} autorizado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }

  autorizarEspecial(proyectoEspecial: ProyectoEspecial): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea autorizar el proyecto ${proyectoEspecial.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, autorizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoEspecial.fechaDeAutorizacion = new Date();
        this.verProyectosNoAutorizadosService.autorizarEspecial(proyectoEspecial.id).subscribe(
          response => {
            this.proyectosEspeciales = this.proyectosEspeciales.filter(pro => pro !== proyectoEspecial)
            swalWithBootstrapButtons.fire(
              'Proyecto autorizado!',
              `Proyecto ${proyectoEspecial.titulo} autorizado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }



}
