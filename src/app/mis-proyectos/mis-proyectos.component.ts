import { Component, OnInit, Input } from '@angular/core';
import { MisProyectosService } from './mis-proyectos.service';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ModalDetalleBianualMisProyectosService } from './detalle-bianual-mis-proyectos/modal-detalle-bianual-mis-proyectos.service';
import { ProyectoBienestar } from '../proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from '../proyectos-especiales/proyecto-especial';



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

  constructor(private misProyectosService: MisProyectosService, private modalDetalleBianualMisProyectos: ModalDetalleBianualMisProyectosService) { }

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

  


}
