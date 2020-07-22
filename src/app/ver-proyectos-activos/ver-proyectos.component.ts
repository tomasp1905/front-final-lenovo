import { Component, OnInit, Input } from '@angular/core';
import { VerProyectoService } from './ver-proyecto.service';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import swal from 'sweetalert2';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';
import { ProgramaEstable } from '../programas-estables/programa-estable';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ModalProgramaEstableService } from './detalle-programa-estable/modal-programa-estable.service';
import { ModalProgramaEstableMiembroService } from './detalle-programa-estable-miembro/modal-programa-estable-miembro.service';
import { ModalProgramaEstableSocioService } from './detalle-programa-estable-socio/modal-programa-estable-socio.service';
import { ModalProgramaEstableSinteticoService } from './detalle-programa-estable-sintetico/modal-programa-estable-sintetico.service';
import { ModalProyectoBienestarService } from './detalle-proyecto-bienestar/modal-proyecto-bienestar.service';
import { ModalProyectoBienestarMiembroService } from './detalle-proyecto-bienestar-miembro/modal-proyecto-bienestar-miembro.service';
import { ModalProyectoBienestarSinteticoService } from './detalle-proyecto-bienestar-sintetico/modal-proyecto-bienestar-sintetico.service';
import { ModalProyectoEspecialService } from './detalle-proyecto-especial/modal-proyecto-especial.service';
import { ModalProyectoEspecialMiembroService } from './detalle-proyecto-especial-miembro/modal-proyecto-especial-miembro.service';
import { ModalProyectoEspecialSocioService } from './detalle-proyecto-especial-socio/modal-proyecto-especial-socio.service';
import { ModalProyectoEspecialSinteticoService } from './detalle-proyecto-especial-sintetico/modal-proyecto-especial-sintetico.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from './detalle-proyecto-bianual/modal.service';
import { ModalSinteticoService } from './detalle-proyecto-bianual-sintetico/modal-sintetico.service';
import { ModalMiembroService } from './detalle-proyecto-bianual-miembro/modal-miembro.service';
import { ModalSocioService } from './detalle-proyecto-bianual-socio/modal-socio.service';
import { AuthService } from '../usuarios/auth.service';



@Component({
  selector: 'app-ver-proyectos',
  templateUrl: './ver-proyectos.component.html'
})
export class VerProyectosComponent implements OnInit {


  proyectosBianuales: ProyectoBianual[];
  programasEstables: ProgramaEstable[];
  proyectosBienestar: ProyectoBienestar[];
  proyectosEspeciales: ProyectoEspecial[];

  proyectoSeleccionadoBianual: ProyectoBianual;
  proyectoSeleccionadoSinteticoBianual: ProyectoBianual;
  proyectoSeleccionadoSocioBianual: ProyectoBianual;
  proyectoSeleccionadoMiembroBianual: ProyectoBianual;

  programaEstableSeleccionado: ProgramaEstable;
  programaEstableSeleccionadoMiembro: ProgramaEstable;
  programaEstableSeleccionadoSocio: ProgramaEstable;
  programaEstableSeleccionadoSintetico: ProgramaEstable;

  proyectoBienestarSeleccionado: ProyectoBienestar;
  proyectoBienestarSeleccionadoMiembro: ProyectoBienestar;
  proyectoBienestarSeleccionadoSintetico: ProyectoBienestar;

  proyectoEspecialSeleccionado: ProyectoEspecial;
  proyectoEspecialSeleccionadoMiembro: ProyectoEspecial;
  proyectoEspecialSeleccionadoSocio: ProyectoEspecial;
  proyectoEspecialSeleccionadoSintetico: ProyectoEspecial;


  constructor(private verProyectoService: VerProyectoService,
    private modalService: ModalService, private modalSinteticoService: ModalSinteticoService,
    private modalSocioService: ModalSocioService, private modalMiembroService: ModalMiembroService,
    private modalServiceProgramaEstable: ModalProgramaEstableService, private modalProgramaEstableMiembroService: ModalProgramaEstableMiembroService,
    private modalProgramaEstableSocioService: ModalProgramaEstableSocioService, private modalProgramaEstableSinteticoService: ModalProgramaEstableSinteticoService,
    private modalProyectoBienestarService: ModalProyectoBienestarService, private modalProyectoBienestarMiembroService: ModalProyectoBienestarMiembroService,
    private modalProyectoBienestarSinteticoService: ModalProyectoBienestarSinteticoService, private modalProyectoEspecialService: ModalProyectoEspecialService,
    private modalProyectoEspecialMiembroService: ModalProyectoEspecialMiembroService, private modalProyectoEspecialSocioService: ModalProyectoEspecialSocioService,
    private modalProyectoEspecialSinteticoService: ModalProyectoEspecialSinteticoService, private router: Router, private activatedRoute: ActivatedRoute, private authService:AuthService) { }

  ngOnInit() {
    this.verProyectoService.getProyectosBianuales().subscribe(
      proyectosBianuales => this.proyectosBianuales = proyectosBianuales
    );
    this.verProyectoService.getProgramasEstables().subscribe(
      programasEstables => this.programasEstables = programasEstables
    );
    this.verProyectoService.getProyectosBienestar().subscribe(
      proyectosBienestar => this.proyectosBienestar = proyectosBienestar
    );
    this.verProyectoService.getProyectosEspeciales().subscribe(
      proyectosEspeciales => this.proyectosEspeciales = proyectosEspeciales
    );

  }

  abrirModalBianual(proyecto: ProyectoBianual) {
    this.proyectoSeleccionadoBianual = proyecto;
    this.modalService.abrirModal();
  }


  abrirModalSinteticoBianual(proyectoSintetico: ProyectoBianual) {
    this.proyectoSeleccionadoSinteticoBianual = proyectoSintetico;
    this.modalSinteticoService.abrirModal();
  }

  abrirModalSocioBianual(proyectoSocio: ProyectoBianual) {
    this.proyectoSeleccionadoSocioBianual = proyectoSocio;
    this.modalSocioService.abrirModal();
  }

  abrirModalMiembroBianual(proyectoMiembro: ProyectoBianual) {
    this.proyectoSeleccionadoMiembroBianual = proyectoMiembro;
    this.modalMiembroService.abrirModal();
  }


  abrirModalProgramaEstable(programa: ProgramaEstable) {
    this.programaEstableSeleccionado = programa;
    this.modalServiceProgramaEstable.abrirModal();
  }

  abrirModalProgramaEstableMiembro(programa: ProgramaEstable) {
    this.programaEstableSeleccionadoMiembro = programa;
    this.modalProgramaEstableMiembroService.abrirModal();
  }

  abrirModalProgramaEstableSocio(programa: ProgramaEstable) {
    this.programaEstableSeleccionadoSocio = programa;
    this.modalProgramaEstableSocioService.abrirModal();
  }

  abrirModalProgramaEstableSintetico(programa: ProgramaEstable) {
    this.programaEstableSeleccionadoSintetico = programa;
    this.modalProgramaEstableSinteticoService.abrirModal();
  }

  abrirModalProyectoBienestar(proyecto: ProyectoBienestar) {
    this.proyectoBienestarSeleccionado = proyecto;
    this.modalProyectoBienestarService.abrirModal();
  }

  abrirModalProyectoBienestarMiembro(proyecto: ProyectoBienestar) {
    this.proyectoBienestarSeleccionadoMiembro = proyecto;
    this.modalProyectoBienestarMiembroService.abrirModal();
  }

  abrirModalProyectoBienestarSintetico(proyecto: ProyectoBienestar) {
    this.proyectoBienestarSeleccionadoSintetico = proyecto;
    this.modalProyectoBienestarSinteticoService.abrirModal();
  }

  abrirModalProyectoEspecial(proyecto: ProyectoEspecial) {
    this.proyectoEspecialSeleccionado = proyecto;
    this.modalProyectoEspecialService.abrirModal();
  }

  abrirModalProyectoEspecialMiembro(proyecto: ProyectoEspecial) {
    this.proyectoEspecialSeleccionadoMiembro = proyecto;
    this.modalProyectoEspecialMiembroService.abrirModal();
  }

  abrirModalProyectoEspecialSocio(proyecto: ProyectoEspecial) {
    this.proyectoEspecialSeleccionadoSocio = proyecto;
    this.modalProyectoEspecialSocioService.abrirModal();
  }

  abrirModalProyectoEspecialSintetico(proyecto: ProyectoEspecial) {
    this.proyectoEspecialSeleccionadoSintetico = proyecto;
    this.modalProyectoEspecialSinteticoService.abrirModal();
  }


  finalizarBianual(proyectoBianual: ProyectoBianual): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea finalizar el proyecto ${proyectoBianual.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, finalizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoBianual.fechaDeFinalizacion = new Date();
        this.verProyectoService.finalizarBianual(proyectoBianual.id).subscribe(
          response => {
            this.proyectosBianuales = this.proyectosBianuales.filter(pro => pro !== proyectoBianual)
            swalWithBootstrapButtons.fire(
              '¡Proyecto finalizado!',
              `Proyecto ${proyectoBianual.titulo} finalizado con éxito.`,
              'success'
            )
          }
        )
      }

    })

  }

  finalizarEstable(programaEstable: ProgramaEstable): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea finalizar el programa ${programaEstable.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, finalizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        programaEstable.fechaDeFinalizacion = new Date();
        this.verProyectoService.finalizarEstable(programaEstable.id).subscribe(
          response => {
            this.programasEstables = this.programasEstables.filter(prog => prog !== programaEstable)
            swalWithBootstrapButtons.fire(
              '¡Programa finalizado!',
              `Programa ${programaEstable.titulo} finalizado con éxito.`,
              'success'
            )
          }
        )

      }

    })
  }

  finalizarBienestar(proyectoBienestar: ProyectoBienestar): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea finalizar el proyecto ${proyectoBienestar.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, finalizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoBienestar.fechaDeFinalizacion = new Date();
        this.verProyectoService.finalizarBienestar(proyectoBienestar.id).subscribe(
          response => {
            this.proyectosBienestar = this.proyectosBienestar.filter(pro => pro !== proyectoBienestar)
            swalWithBootstrapButtons.fire(
              '¡Proyecto finalizado!',
              `Proyecto ${proyectoBienestar.titulo} finalizado con éxito.`,
              'success'
            )
          }
        )

      }

    })
  }

  finalizarEspecial(proyectoEspecial: ProyectoEspecial): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea finalizar el proyecto ${proyectoEspecial.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, finalizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        proyectoEspecial.fechaDeFinalizacion = new Date();
        this.verProyectoService.finalizarEspecial(proyectoEspecial.id).subscribe(
          response => {
            this.proyectosEspeciales = this.proyectosEspeciales.filter(pro => pro !== proyectoEspecial)
            swalWithBootstrapButtons.fire(
              '¡Proyecto finalizado!',
              `Proyecto ${proyectoEspecial.titulo} finalizado con éxito.`,
              'success'
            )
          }
        )

      }

    })
  }



  generar(proyecto:ProyectoBianual){
    //console.log("entro al componente con el id: " + proyecto.id)
    this.verProyectoService.generar(proyecto.id);
  }

  generarPDFEstable(programa:ProgramaEstable){
    //console.log("entro al componente con el id: " + programa.id)
    this.verProyectoService.generarPDFEstable(programa.id);
  }

  generarPDFBienestar(proyecto:ProyectoBienestar){
    //console.log("entro al componente con el id: " + proyecto.id)
    this.verProyectoService.generarPDFBienestar(proyecto.id);
  }

  generarPDFEspecial(proyecto:ProyectoEspecial){
    //console.log("entro al componente con el id: " + proyecto.id)
    this.verProyectoService.generarPDFEspecial(proyecto.id);
  }





}
