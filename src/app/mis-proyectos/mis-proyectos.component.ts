import { Component, OnInit, Input } from '@angular/core';
import { MisProyectosService } from './mis-proyectos.service';
import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { Usuario } from '../usuarios/usuario';
import { Director } from '../proyectos-bianuales/objetos/director';

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html'
})
export class MisProyectosComponent implements OnInit {

  proyectosBianuales: ProyectoBianual[];

  constructor(private misProyectosService: MisProyectosService) { }

  ngOnInit() {
    this.misProyectosService.getProyectosBianuales().subscribe(
      proyectosBianuales => this.proyectosBianuales = proyectosBianuales
    );
  }


}
